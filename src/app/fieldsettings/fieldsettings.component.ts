import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fieldSettings, TableSettingsService } from '../services/table-settings.service';

interface tableAndFieldIndices {
  tableIndex: number,
  fieldIndex: number
}

@Component({
  selector: 'app-fieldsettings',
  templateUrl: './fieldsettings.component.html',
  styleUrls: ['./fieldsettings.component.css']
})
export class FieldsettingsComponent implements OnInit {

  constructor(private tableSettingsService: TableSettingsService,
    @Inject(MAT_DIALOG_DATA) public tableAndFieldIndices: tableAndFieldIndices ) { }

  ngOnInit(): void {
  }

  getField(): fieldSettings {
    return this.tableSettingsService
      .getTables()[this.tableAndFieldIndices.tableIndex]
      .fields[this.tableAndFieldIndices.fieldIndex];
  }

  save(name: string) {
    this.getField().name = name;
  }
}
