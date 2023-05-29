import { FlatTreeControl } from '@angular/cdk/tree';
import { Injectable } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

export interface FieldSettings {
  name: string,
  type: string
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
      {name: "title", type: "string"}
    ]
  }, {
    name: "SecondTable",
    fields: [
      {name: "age", type: "long"}
    ]
  }]

  constructor() { }

  getTables() {
    return this.tables
  }


}
