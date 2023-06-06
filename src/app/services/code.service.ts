import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { booturl } from 'src/environments/environment';
import { Table, TableSettingsService } from './table-settings.service';

export enum DownloadType {
  Entity,
  Controller,
  Repository,
  FlywayInit,
  Pom,
  Properties,
  Application,
  Readme
}

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor(
    private http: HttpClient,
    private tableSettingsService: TableSettingsService) { }

  groupId = "com.example"
  artifactId = "demo"
  packageName: string = this.groupId + "." + this.artifactId
  databaseURL: string = "jdbc:mysql://localhost:3306/databaseId"
  databaseUser: string = "root"
  databasePassword: string = "databasePassword"
  code: string = ""
  currentTableIndex: number = 0
  currentDownloadType: DownloadType = DownloadType.Controller
  currentFileName: string = "";

  getCode() {
    return this.code;
  }

  getCurrentFileName() {
    return this.currentFileName;
  }

  // downloadCode(folderIndex: number, tableIndex: number) {
  //   if (folderIndex == 0) this.getControllerCode(tableIndex)
  //   else if (folderIndex == 1) this.getRepositoryCode(tableIndex)
  //   else if (folderIndex == 2) this.getEntityCode(tableIndex)
  // }

  downloadCode(downloadType: DownloadType, tableIndex?: number) {
    if (downloadType === DownloadType.Entity) {
      return this.getEntityCode(tableIndex ?? 0)
    } else if (downloadType === DownloadType.Application) {
      return this.getApplicationCode()
    } else if (downloadType === DownloadType.Controller) {
      return this.getControllerCode(tableIndex ?? 0)
    } else if (downloadType === DownloadType.FlywayInit) {
      return this.getFlywayInitCode()
    } else if (downloadType === DownloadType.Pom) {
      return this.getPomCode()
    } else if (downloadType === DownloadType.Properties) {
      return this.getPropertiesCode()
    } else if (downloadType === DownloadType.Readme) {
      return this.getReadmeCode()
    } else {
      return this.getRepositoryCode(tableIndex ?? 0)
    }
  }

  downloadCodeToViewer(downloadType: DownloadType, fileName: string, tableIndex?: number) {
    this.downloadCode(downloadType, tableIndex).subscribe(code => {
      this.code = code
      this.currentTableIndex = tableIndex ?? 0
      this.currentDownloadType = downloadType
    });
    this.currentFileName = fileName;
  }


  getEntityCode(tableIndex: number) {
    return this.http.post(booturl + "/entity", {
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
      {responseType: 'text'});
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
    return this.http.post(booturl + "/flyway/init", {
      "tables": postBody
    }, {
      responseType: 'text'
    });
  }

  getRepositoryCode(tableIndex: number) {
    return this.http.post(booturl + "/repository", {
        "packageName": this.packageName,
        "name": this.tableSettingsService.getTables()[tableIndex].name
        // "fields": this.tableSettingsService.getTables()[0].fields.map(fieldSettings => fieldSettings.name)
      },
      {responseType: 'text'})
  }

  getControllerCode(tableIndex: number) {
    return this.http.post(booturl + "/controller", {
        "packageName": this.packageName,
        "name": this.tableSettingsService.getTables()[tableIndex].name
        // "fields": this.tableSettingsService.getTables()[0].fields.map(fieldSettings => fieldSettings.name)
      },
      {responseType: 'text'})
  }

  getApplicationCode() {
    return this.http.post(booturl + "/application", {
      "groupID": this.groupId,
      "artifactID": this.artifactId
    },
    {
      responseType: 'text'
    });
  }

  getPomCode() {
    return this.http.post(booturl + "/pom", {
      "groupID": this.groupId,
      "artifactID": this.artifactId
    },
    {responseType: 'text'})
  }

  getReadmeCode() {
    return this.http.post(booturl + "/readme", {
      "applicationName": this.artifactId.charAt(0).toUpperCase() + this.artifactId.substring(1) + "Application.java"
    },
    {
      responseType: 'text'
    });
  }

  getPropertiesCode() {
    return this.http.post(booturl + "/properties", {
      "databaseURL": this.databaseURL,
      "databaseUser": this.databaseUser,
      "databasePassword": this.databasePassword
    }, {
      responseType: 'text'
    });
  }

}
