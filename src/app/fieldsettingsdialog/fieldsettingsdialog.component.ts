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

  type?: string;

  constructor(private tableSettingsService: TableSettingsService,
    private codeService: CodeService,
    @Inject(MAT_DIALOG_DATA) public tableAndFieldIndices: TableAndFieldIndices ) { }

  ngOnInit(): void {
    this.type = this.getField().type;
  }

  getField(): FieldSettings {
    return this.tableSettingsService
      .getTables()[this.tableAndFieldIndices.tableIndex]
      .fields[this.tableAndFieldIndices.fieldIndex];
  }

  save(name: string) {
    this.getField().name = name;
    this.getField().type = this.type ?? "string";
    if (this.codeService.currentTableIndex === this.tableAndFieldIndices.tableIndex) {
      this.codeService.downloadCode(this.codeService.currentDownloadType, this.tableAndFieldIndices.tableIndex)
    }

  }
}
