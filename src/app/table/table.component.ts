import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FieldsettingsComponent } from '../fieldsettings/fieldsettings.component';
import { fieldSettings, tableSettings, TableSettingsService } from '../services/table-settings.service';

// export enum dataType {
//   Integer,
//   String
// }

// export interface column {
//   name: string,
//   type: dataType
// }

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private tableSettingsService: TableSettingsService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  // @Input() tableSettings: tableSettings = {
  //   name: "Table",
  //   fields: []
  // }

  @Input() tableIndex: number = 0;

  // columns: column[] = [{
  //   name: "id",
  //   type: dataType.Integer
  // }, {
  //   name: "name",
  //   type: dataType.String
  // }];

  getTable() {
    return this.tableSettingsService.getTables()[this.tableIndex];
  }

  drop(event: CdkDragDrop<fieldSettings[]>) {
    moveItemInArray(this.getTable().fields, event.previousIndex, event.currentIndex);
    // moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  add() {
    this.getTable().fields = this.getTable().fields.concat([{
      name: "newColumn",
    }]);
  }

  openDialog(fieldIndex: number) {
    this.dialog.open(FieldsettingsComponent, {
      data: {
        tableIndex: this.tableIndex,
        fieldIndex: fieldIndex
      }
    })
  }
}
