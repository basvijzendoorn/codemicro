import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { booturl } from 'src/environments/environment';
import { TableSettings, TableSettingsService } from './table-settings.service';

export enum DownloadType {
  Entity,
  Controller,
  Repository,
  FlywayInit,
  Pom,
  Properties
}

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor(
    private http: HttpClient,
    private tableSettingsService: TableSettingsService) { }

  groupId = "com.perseverance"
  artifactId = "demo"
  packageName: string = this.groupId + "." + this.artifactId
  databaseURL: string = "jdbc:mysql://localhost:3306/databaseId"
  databaseUser: string = "root"
  databasePassword: string = "databasePassword"
  code: string = ""
  tableIndex: number = 0
  folderIndex: number = 0

  getCode() {
    return this.code;
  }

  downloadCode(folderIndex: number, tableIndex: number) {
    if (folderIndex == 0) this.getControllerCode(tableIndex)
    else if (folderIndex == 1) this.getRepositoryCode(tableIndex)
    else if (folderIndex == 2) this.getEntityCode(tableIndex)
  }


  getEntityCode(tableIndex: number) {
    this.http.post(booturl + "/entity", {
        "packageName": this.packageName,
        "name": this.tableSettingsService.getTables()[tableIndex].name,
        "fields": this.tableSettingsService.getTables()[tableIndex].fields.map(field => {
          return {
            "name": field.name,
            "type": field.type.toUpperCase()
          };
        })
        //"fields": this.tableSettingsService.getTables()[tableIndex].fields.map(fieldSettings => fieldSettings.name)
      },
      {responseType: 'text'})
    .subscribe(code => {
      this.code = code
      this.tableIndex = tableIndex
    });
  }

  getRepositoryCode(tableIndex: number) {
    this.http.post(booturl + "/repository", {
        "packageName": this.packageName,
        "name": this.tableSettingsService.getTables()[tableIndex].name
        // "fields": this.tableSettingsService.getTables()[0].fields.map(fieldSettings => fieldSettings.name)
      },
      {responseType: 'text'})
    .subscribe(code => {
      this.code = code
      this.tableIndex = tableIndex
    })
  }

  getControllerCode(tableIndex: number) {
    this.http.post(booturl + "/controller", {
        "packageName": this.packageName,
        "name": this.tableSettingsService.getTables()[tableIndex].name
        // "fields": this.tableSettingsService.getTables()[0].fields.map(fieldSettings => fieldSettings.name)
      },
      {responseType: 'text'})
    .subscribe(code => {
      this.code = code
      this.tableIndex = tableIndex
    })
  }

  getPomCode() {
    this.http.post(booturl + "/pom", {
      "groupID": this.groupId,
      "artifactID": this.artifactId,
      "databaseURL": this.databaseURL,
      "databaseUser": this.databaseUser,
      "databasePassword": this.databasePassword
    },
    {responseType: 'text'})
    .subscribe(code => {
      this.code = code
    })
  }

  getPropertiesCode() {
    this.http.post(booturl + "/properties", {
      "databaseURL": this.databaseURL,
      "databaseUser": this.databaseUser,
      "databasePassword": this.databasePassword
    }, {
      responseType: 'text'
    })
    .subscribe(code => {
      this.code = code
    })
  }
}
