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
  Properties,
  Application
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
  currentTableIndex: number = 0
  currentDownloadType: DownloadType = DownloadType.Controller

  getCode() {
    return this.code;
  }

  // downloadCode(folderIndex: number, tableIndex: number) {
  //   if (folderIndex == 0) this.getControllerCode(tableIndex)
  //   else if (folderIndex == 1) this.getRepositoryCode(tableIndex)
  //   else if (folderIndex == 2) this.getEntityCode(tableIndex)
  // }

  downloadCode(downloadType: DownloadType, tableIndex?: number) {
    if (downloadType === DownloadType.Entity) {
      this.getEntityCode(tableIndex ?? 0);
    } else if (downloadType === DownloadType.Application) {
      this.getApplicationCode();
    } else if (downloadType === DownloadType.Controller) {
      this.getControllerCode(tableIndex ?? 0);
    } else if (downloadType === DownloadType.FlywayInit) {
      this.getFlywayInitCode();
    } else if (downloadType === DownloadType.Pom) {
      this.getPomCode();
    } else if (downloadType === DownloadType.Properties) {
      this.getPropertiesCode();
    } else if (downloadType === DownloadType.Repository) {
      this.getRepositoryCode(tableIndex ?? 0);
    }
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
      this.currentTableIndex = tableIndex
      this.currentDownloadType = DownloadType.Entity
    });
  }

  getFlywayInitCode() {
    var postBody = this.tableSettingsService.getTables().map(table => {
      return {
        "tableName": table.name,
        "fields": table.fields.map(field => {
          return {
            "name": field.name,
            "type": field.type.toUpperCase()
          }
        })
      }
    });
    this.http.post(booturl + "/flyway/init", {
      "tables": postBody
    }, {
      responseType: 'text'
    }).subscribe(code => {
      this.code = code
      this.currentDownloadType = DownloadType.FlywayInit
    })
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
      this.currentTableIndex = tableIndex
      this.currentDownloadType = DownloadType.Repository
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
      this.currentTableIndex = tableIndex
      this.currentDownloadType = DownloadType.Controller
    })
  }

  getApplicationCode() {
    this.http.post(booturl + "/application", {
      "groupID": this.groupId,
      "artifactID": this.artifactId
    },
    {
      responseType: 'text'
    })
    .subscribe(code => {
      this.code = code
      this.currentDownloadType = DownloadType.Application
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
      this.currentDownloadType = DownloadType.Pom
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
      this.currentDownloadType = DownloadType.Properties
    })
  }

}
