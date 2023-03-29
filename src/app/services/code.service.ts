import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TableSettingsService } from './table-settings.service';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor(
    private http: HttpClient,
    private tableSettingsService: TableSettingsService) { }

  packageName: string = "com.perseverance"

  getEntityCode(): Observable<string> {
    return this.http.post("/api/entity", {
      "packageName": this.packageName,
      "name": this.tableSettingsService.getTables()[0].name,
      "fields": this.tableSettingsService.getTables()[0].fields.map(fieldSettings => fieldSettings.name)
    },
    {responseType: 'text'});
  }

  getRepositoryCode(): Observable<string> {
    return this.http.post("/api/repository", {
      "packageName": this.packageName,
      "name": this.tableSettingsService.getTables()[0].name
      // "fields": this.tableSettingsService.getTables()[0].fields.map(fieldSettings => fieldSettings.name)
    },
    {responseType: 'text'});
  }

  getControllerCode(): Observable<string> {
    return this.http.post("/api/controller", {
      "packageName": this.packageName,
      "name": this.tableSettingsService.getTables()[0].name
      // "fields": this.tableSettingsService.getTables()[0].fields.map(fieldSettings => fieldSettings.name)
    },
    {responseType: 'text'});
  }
}
