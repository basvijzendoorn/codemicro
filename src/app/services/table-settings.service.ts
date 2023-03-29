import { FlatTreeControl } from '@angular/cdk/tree';
import { Injectable } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

export interface FieldSettings {
  name: string
}

export interface TableSettings {
  name: string
  fields: FieldSettings[]
}


@Injectable({
  providedIn: 'root'
})
export class TableSettingsService {

  tables: TableSettings[] = [{
    name: "FirstTable",
    fields: [
      {name: "bas"}
    ]
  }, {
    name: "SecondTable",
    fields: [
      {name: "title"}
    ]
  }]

  constructor() { }

  getTables() {
    return this.tables
  }


}
