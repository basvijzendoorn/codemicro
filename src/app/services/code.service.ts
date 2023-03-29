import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  getCode() {
    return this.code;
  }

  getEntityCode(table: TableSettings) {
    this.http.post("/api/entity", {
        "packageName": this.packageName,
        "name": table.name,
        "fields": table.fields.map(fieldSettings => fieldSettings.name)
      },
      {responseType: 'text'})
    .subscribe(code => {
      this.code = code
    });
  }

  getRepositoryCode(table: TableSettings) {
    this.http.post("/api/repository", {
        "packageName": this.packageName,
        "name": table.name
        // "fields": this.tableSettingsService.getTables()[0].fields.map(fieldSettings => fieldSettings.name)
      },
      {responseType: 'text'})
    .subscribe(code => {
      this.code = code
    })
  }

  getControllerCode(table: TableSettings) {
    this.http.post("/api/controller", {
        "packageName": this.packageName,
        "name": table.name
        // "fields": this.tableSettingsService.getTables()[0].fields.map(fieldSettings => fieldSettings.name)
      },
      {responseType: 'text'})
    .subscribe(code => {
      this.code = code
    })
  }
}
