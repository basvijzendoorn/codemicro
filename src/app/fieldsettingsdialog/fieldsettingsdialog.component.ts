import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CodeService } from '../services/code.service';
import { FieldSettings, TableSettingsService } from '../services/table-settings.service';

interface TableAndFieldIndices {
  tableIndex: number,
  fieldIndex: number
}

@Component({
  selector: 'app-fieldsettingsdialog',
  templateUrl: './fieldsettingsdialog.component.html',
  styleUrls: ['./fieldsettingsdialog.component.css']
})
export class FieldSettingsDialogComponent implements OnInit {

  constructor(private tableSettingsService: TableSettingsService,
    private codeService: CodeService,
    @Inject(MAT_DIALOG_DATA) public tableAndFieldIndices: TableAndFieldIndices ) { }

  ngOnInit(): void {
  }

  getField(): FieldSettings {
    return this.tableSettingsService
      .getTables()[this.tableAndFieldIndices.tableIndex]
      .fields[this.tableAndFieldIndices.fieldIndex];
  }

  save(name: string) {
    this.getField().name = name;
    if (this.codeService.tableIndex === this.tableAndFieldIndices.tableIndex) {
      this.codeService.downloadCode(this.codeService.folderIndex, this.tableAndFieldIndices.tableIndex)
    }

  }
}
