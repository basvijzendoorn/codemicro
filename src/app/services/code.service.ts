import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { booturl } from 'src/environments/environment';
import { Table, TableSettingsService } from './table-settings.service';

export enum DownloadType {
  Entity,
  DTO,
  Service,
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
  databaseURL: string = "jdbc:postgresql://localhost:5432/code"
  databaseUser: string = "postgres"
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
    } else if (downloadType === DownloadType.DTO) {
      return this.getDtoCode(tableIndex ?? 0);
    } else if (downloadType === DownloadType.Service) {
      return this.getServiceCode(tableIndex ?? 0);
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

  downloadCodeToViewer(downloadType: DownloadType, fileName: string, tableIndex?: number) {
    this.downloadCode(downloadType, tableIndex).subscribe(code => {
      this.code = code
      this.currentTableIndex = tableIndex ?? 0
      this.currentDownloadType = downloadType
    });
    this.currentFileName = fileName;
  }

  typeIsRelationship(type: string) {
    if (type === 'onetoone' || type === 'onetomany' || type === 'manytoone' || type === 'manytomany') {
      return true;
    }
    return false;
  }

  getRelationship(id?: string) {
    return this.tableSettingsService.getRelationships().find(relationship => relationship.id === id);
  }


  getEntityCode(tableIndex: number) {
    return this.http.post(booturl + "/entity", {
        "packageName": this.packageName,
        "name": this.tableSettingsService.getTables()[tableIndex].name,
        "fields": this.tableSettingsService.getTables()[tableIndex].fields.map(field => {
          return {
            "name": field.name,
            "type": field.type.toUpperCase(),
            "relationship" : this.typeIsRelationship(field.type) ? {
              "type": this.getRelationship(field.referenceId)?.type,
              "tableName": this.getRelationship(field.referenceId)?.tableName,
              "fieldName": this.getRelationship(field.referenceId)?.fieldName,
              "targetTableName": this.getRelationship(field.referenceId)?.targetTableName,
              "targetFieldName": this.getRelationship(field.referenceId)?.targetFieldName,
              "intermediateTableName": this.getRelationship(field.referenceId)?.intermediateTableName
            } : null
          };
        })
        //"fields": this.tableSettingsService.getTables()[tableIndex].fields.map(fieldSettings => fieldSettings.name)
      },
      {responseType: 'text'});
  }

  getDtoCode(tableIndex: number) {
    return this.http.post(booturl + "/dto", {
        "packageName": this.packageName,
        "name": this.tableSettingsService.getTables()[tableIndex].name,
        "fields": this.tableSettingsService.getTables()[tableIndex].fields.map(field => {
          return {
            "name": field.name,
            "type": field.type.toUpperCase(),
            "relationship" : this.typeIsRelationship(field.type) ? {
              "type": this.getRelationship(field.referenceId)?.type,
              "tableName": this.getRelationship(field.referenceId)?.tableName,
              "fieldName": this.getRelationship(field.referenceId)?.fieldName,
              "targetTableName": this.getRelationship(field.referenceId)?.targetTableName,
              "targetFieldName": this.getRelationship(field.referenceId)?.targetFieldName,
              "intermediateTableName": this.getRelationship(field.referenceId)?.intermediateTableName
            } : null
          }
        })
    },{
      responseType: 'text'
    });
  }

  getServiceCode(tableIndex: number) {
    return this.http.post(booturl + "/service", {
      "packageName": this.packageName,
      "modelName": this.tableSettingsService.getTables()[tableIndex].name,
      "fields": this.tableSettingsService.getTables()[tableIndex].fields.map(field => {
        return {
          "name": field.name,
          "type": field.type.toUpperCase(),
          "relationship" : this.typeIsRelationship(field.type) ? {
            "type": this.getRelationship(field.referenceId)?.type,
            "tableName": this.getRelationship(field.referenceId)?.tableName,
            "fieldName": this.getRelationship(field.referenceId)?.fieldName,
            "targetTableName": this.getRelationship(field.referenceId)?.targetTableName,
            "targetFieldName": this.getRelationship(field.referenceId)?.targetFieldName,
            "intermediateTableName": this.getRelationship(field.referenceId)?.intermediateTableName
          } : null
        }
      })
    },{
      responseType: 'text'
    });
  }

  getFlywayInitCode() {
    var postBody = this.tableSettingsService.getTables().map(table => {
      return {
        "tableName": table.name,
        "fields": table.fields.map(field => {
          return {
            "name": field.name,
            "type": field.type.toUpperCase(),
            "relationship" : this.typeIsRelationship(field.type) ? {
              "type": this.getRelationship(field.referenceId)?.type,
              "tableName": this.getRelationship(field.referenceId)?.tableName,
              "fieldName": this.getRelationship(field.referenceId)?.fieldName,
              "targetTableName": this.getRelationship(field.referenceId)?.targetTableName,
              "targetFieldName": this.getRelationship(field.referenceId)?.targetFieldName,
              "intermediateTableName": this.getRelationship(field.referenceId)?.intermediateTableName
            } : null
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

  deployCode(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const params = new HttpParams();
    const options = {
      params: params
    }

    return this.http.post(booturl + "/deploy", formData, options);
  }

}
