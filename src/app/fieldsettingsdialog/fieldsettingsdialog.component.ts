import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CodeService } from '../services/code.service';
import { FieldSettings, TableSettingsService } from '../services/table-settings.service';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

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

  nameFormControl = new FormControl('', [
    Validators.pattern('[A-Za-z_$][a-zA-Z0-9_$]*'),
    Validators.required,
    this.uniqueFieldNameValidator()
  ]);    

  ngOnInit(): void {
    this.type = this.getField().type;
    this.nameFormControl.setValue(this.getField().name)
  }

  getField(): FieldSettings {
    return this.tableSettingsService
      .getTables()[this.tableAndFieldIndices.tableIndex]
      .fields[this.tableAndFieldIndices.fieldIndex];
  }

  getFields() {
    return this.tableSettingsService
      .getTables()[this.tableAndFieldIndices.tableIndex].fields;
  }

  save() {
    this.getField().name = this.nameFormControl.value;
    this.getField().type = this.type ?? "string";
    this.tableSettingsService.saveTables();
    if (this.codeService.currentTableIndex === this.tableAndFieldIndices.tableIndex) {
      this.codeService.downloadCodeToViewer(this.codeService.currentDownloadType, this.codeService.currentFileName, this.tableAndFieldIndices.tableIndex);
    }
  }

  get required() {
    return this.nameFormControl.hasError("required");
  }

  get nameInvalid() {
    return this.nameFormControl.hasError("pattern");
  }

  get fieldExists() {
    return this.nameFormControl.hasError('fieldExists');
  }

  uniqueFieldNameValidator(): ValidatorFn {
    const fieldNames = this.getFields().map(field => field.name);
    fieldNames.splice(this.tableAndFieldIndices.fieldIndex, 1);

    return (control:AbstractControl): ValidationErrors | null => {
      return fieldNames.includes(control.value) ? {fieldExists: true} : null;
    }
  }
}
