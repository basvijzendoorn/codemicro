import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { booturl } from 'src/environments/environment';
import { TableSettings, TableSettingsService } from './table-settings.service';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor(
    private http: HttpClient,
    private tableSettingsService: TableSettingsService) { }

  packageName: string = "com.perseverance"
  code: string = ""
  tableIndex: number = 0
  folderIndex: number = 0

  getCode() {
    return this.code;
  }

  downloadCode(folderIndex: number, tableIndex: number) {
    if (folderIndex == 0) this.getControllerCode(folderIndex, tableIndex)
    else if (folderIndex == 1) this.getRepositoryCode(folderIndex, tableIndex)
    else if (folderIndex == 2) this.getEntityCode(folderIndex, tableIndex)
  }


  getEntityCode(folderIndex: number, tableIndex: number) {
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
      this.folderIndex = folderIndex
    });
  }

  getRepositoryCode(folderIndex: number, tableIndex: number) {
    this.http.post(booturl + "/repository", {
        "packageName": this.packageName,
        "name": this.tableSettingsService.getTables()[tableIndex].name
        // "fields": this.tableSettingsService.getTables()[0].fields.map(fieldSettings => fieldSettings.name)
      },
      {responseType: 'text'})
    .subscribe(code => {
      this.code = code
      this.tableIndex = tableIndex
      this.folderIndex = folderIndex
    })
  }

  getControllerCode(folderIndex: number, tableIndex: number) {
    this.http.post(booturl + "/controller", {
        "packageName": this.packageName,
        "name": this.tableSettingsService.getTables()[tableIndex].name
        // "fields": this.tableSettingsService.getTables()[0].fields.map(fieldSettings => fieldSettings.name)
      },
      {responseType: 'text'})
    .subscribe(code => {
      this.code = code
      this.tableIndex = tableIndex
      this.folderIndex = folderIndex
    })
  }
}
