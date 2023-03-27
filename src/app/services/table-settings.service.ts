import { Injectable } from '@angular/core';

export interface fieldSettings {
  name: string
}

export interface tableSettings {
  name: string
  fields: fieldSettings[]
}


@Injectable({
  providedIn: 'root'
})
export class TableSettingsService {

  tables: tableSettings[] = [{
    name: "First table",
    fields: [
      {name: "id"}
    ]
  }, {
    name: "Second table",
    fields: [
      {name: "title"}
    ]
  }]

  constructor() { }

  getTables() {
    return this.tables
  }
}
