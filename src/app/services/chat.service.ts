import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { aiurl, environment } from 'src/environments/environment';
import { CodeService, DownloadType } from './code.service';
import { TableSettingsService } from './table-settings.service';

export interface AIEntity {
  name: string,
  type: string
}

export interface AIResponse {
  task: string,
  entities: AIEntity[]
}

export interface Chat {
  text: string,
  ibex: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient,
              private tableSettingsService: TableSettingsService,
              private codeService: CodeService) { }

  types = ["string", "datetime", "date", "number", "integer", "long", "text", "double", "float"]
  chatActive: boolean = true;
  chats: Chat[] = [{
    text: "As an AI chatbot I can add and remove tables and fields.",
    ibex: true
  }]

  getChats() {
    return this.chats;
  }

  isChatActive() {
    return this.chatActive;
  }

  activateChat() {
    this.chatActive = true;
  }

  deactivateChat() {
    this.chatActive = false;
  }

  activateColdstart() {
    this.http.get<AIResponse>(aiurl + '/coldstart').subscribe(resp => {

    });
  }

  update(text: string) {
    this.chats.push({
      text: text,
      ibex: false
    })

    text = text.replaceAll(',',' , ').replaceAll('_',' _ ').replaceAll('.', ' . ').replaceAll('/', ' / ').replaceAll("\"", " \" ")

    var table = "", field = "", type = ""

    const replacedText = text.split(" ").map(entity => {
      if (this.isTable(entity)) {
        table = entity
        return "T#"
      }
      else if (this.isField(entity)) {
        field = entity
        return "F#"
      }
      else if (this.isType(entity)) {
        type = entity
        return "Y#"
      }
      else return entity
    }).join(" ")

    this.http.post<AIResponse>(aiurl, {
      "text": replacedText
    }).subscribe(resp => {
      if (resp.task == "AddTable") {
        this.addTable(resp.entities[0].name)
        this.chats.push({
          text: "Added table " + resp.entities[0].name + ".",
          ibex: true
        })
      } else if (resp.task == "AddToTable") {
        this.addToTable(table, resp.entities[0].name, "string")
        this.chats.push({
          text: "Added field " + resp.entities[0].name + " to table " + table + ".",
          ibex: true
        })
      } else if (resp.task == "AddType") {
        this.addToTable(table, resp.entities[0].name, type)
        this.chats.push({
          text: "Added field " + resp.entities[0].name + " with type " + type + " to " + table + ".",
          ibex: true
        })
      } else if (resp.task == "RemoveTable") {
        this.removeTable(table);
        this.chats.push({
          text: "Removed table " + table + ".",
          ibex: true
        })
      } else if (resp.task == "RemoveField") {
        this.removeField(field, table);
        this.chats.push({
          text: "Removed field " + field + " from table " + table + ".",
          ibex: true
        })
      }
    })
  }

  isTable(name: string) {
    return this.tableSettingsService.getTables()
      .map(table => table.name.toLowerCase())
      .includes(name.toLowerCase())
  }

  isField(name: string) {
    return this.tableSettingsService.getTables()
      .flatMap(table => table.fields)
      .map(fieldSet => fieldSet.name.toLowerCase())
      .includes(name.toLowerCase())
  }

  isType(name: string) {
    return this.types.includes(name.toLowerCase())
  }

  getTableIndex(name: string) {
    return this.tableSettingsService.getTables()
      .map(table => table.name.toLowerCase())
      .indexOf(name.toLowerCase())
  }

  addTable(name: string) {
    this.tableSettingsService.getTables().push({
      name: name,
      fields: []
    })
    this.tableSettingsService.saveTables();
    if (this.codeService.currentDownloadType === DownloadType.FlywayInit) {
      this.codeService.downloadCodeToViewer(DownloadType.FlywayInit, this.codeService.currentFileName);
    }
  }

  addToTable(tableName: string, field: string, type: string) {
    type = type.toLowerCase().replaceAll("number", "long").replaceAll("integer", "long").replaceAll("text", "string").replaceAll("float", "double")

    const tableIndex = this.getTableIndex(tableName);

    if (tableIndex != undefined) {
      this.tableSettingsService.getTables()[tableIndex].fields.push({
        name: field,
        type: type
      });
      this.tableSettingsService.saveTables();
      if (this.codeService.currentTableIndex === tableIndex) {
        this.codeService.downloadCodeToViewer(this.codeService.currentDownloadType, this.codeService.currentFileName, tableIndex)
      }

    }

  }

  removeTable(name: string) {
    const tableIndex = this.getTableIndex(name);
    this.tableSettingsService.getTables().splice(tableIndex, 1)
    this.tableSettingsService.saveTables();
    if (this.codeService.currentDownloadType === DownloadType.FlywayInit) {
      this.codeService.downloadCodeToViewer(DownloadType.FlywayInit, this.codeService.currentFileName);
    }
  }

  removeField(fieldName: string, tableName: string) {
    var tableIndex, fieldIndex;
    if (tableName != "") {
      tableIndex = this.getTableIndex(tableName)
      fieldIndex = this.tableSettingsService.getTables()[tableIndex].fields
        .map(field => field.name.toLowerCase())
        .indexOf(fieldName.toLowerCase())
    } else {
      for (let [tIndex, table] of this.tableSettingsService.getTables().entries()) {
        for (let [fIndex, field] of table.fields.entries()) {
          if (field.name.toLowerCase() === fieldName.toLowerCase()) {
            tableIndex = tIndex;
            fieldIndex = fIndex;
            break;
          }
        }
      }
    }

    this.tableSettingsService.getTables()[tableIndex].fields.splice(fieldIndex, 1)
    this.tableSettingsService.saveTables();

    if (this.codeService.currentTableIndex === tableIndex) {
      this.codeService.downloadCodeToViewer(this.codeService.currentDownloadType, this.codeService.currentFileName, tableIndex)
    }
  }
}
