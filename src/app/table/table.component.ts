import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FielddialogComponent } from '../fielddialog/fielddialog.component';
import { FieldSettingsDialogComponent } from '../fieldsettingsdialog/fieldsettingsdialog.component';
import { CodeService } from '../services/code.service';
import { FieldSettings, Table, TableSettingsService } from '../services/table-settings.service';
import { table } from 'console';

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
    private dialog: MatDialog,
    private codeService: CodeService) { }

  ngOnInit(): void {
  }

  @Input() tableIndex: number = 0;

  typeToIcon(type: string) {
    if (type == 'string') {
      return 'subject';
    } else if (type == 'long') {
      return 'pin';
    } else if (type == 'double') {
      return 'pin';
    } else if (type == 'date') {
      return 'calendar_month';
    } else if (type == 'datetime') {
      return 'access_time';
    } else if (type == 'onetoone') {
      return 'horizontal_rule'
    } else if (type == 'onetomany') {
      return 'east';
    } else if (type == 'manytoone') {
      return 'west';
    } else if (type == 'manytomany') {
      return 'compare_arrows';
    }
    return 'subject';
  }

  getTable() {
    return this.tableSettingsService.getTables()[this.tableIndex];
  }

  drop(event: CdkDragDrop<FieldSettings[]>) {
    moveItemInArray(this.getTable().fields, event.previousIndex, event.currentIndex);
    this.tableSettingsService.saveTables()
    if (this.codeService.currentTableIndex === this.tableIndex) {
      this.codeService.downloadCodeToViewer(this.codeService.currentDownloadType, this.codeService.currentFileName, this.tableIndex)
    }
  }

  openAddFieldDialog() {
    this.dialog.open(FielddialogComponent, {
      data: {
        settingsField: false,
        tableIndex: this.tableIndex
      }
    })
  }

  delete(fieldIndex: number) {
    const relid = this.getTable().fields[fieldIndex].referenceId
    if (relid != undefined) {
      const tables = this.tableSettingsService.getTables();
      tables.forEach( (table, tableIndex) => {
        const fieldsToBeDeleted: number[] = []
        table.fields.forEach( (field, fieldIndex) => {
          if (field.referenceId == relid) {
            fieldsToBeDeleted.push(fieldIndex);
            // table.fields.splice(fieldIndex, 1);
          }
        });
        fieldsToBeDeleted.forEach((fieldIndex, index) => table.fields.splice(fieldIndex - index, 1));
      });
      const relationshipIndex = this.tableSettingsService.getRelationships().findIndex(rel => rel.id === relid)
      this.tableSettingsService.getRelationships().splice(relationshipIndex, 1);
    } else {
      this.getTable().fields.splice(fieldIndex, 1);
    }

    this.tableSettingsService.saveTables()
    if (this.codeService.currentTableIndex === this.tableIndex) {
      this.codeService.downloadCodeToViewer(this.codeService.currentDownloadType, this.codeService.currentFileName, this.tableIndex)
    }
  }

  openSettingsDialog(fieldIndex: number) {
    this.dialog.open(FielddialogComponent, {
      data: {
        settingsField: true,
        tableIndex: this.tableIndex,
        fieldIndex: fieldIndex
      }
    });
  }
}
