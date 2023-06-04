import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CodeService } from '../services/code.service';
import { TableSettingsService } from '../services/table-settings.service';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-addfielddialog',
  templateUrl: './addfielddialog.component.html',
  styleUrls: ['./addfielddialog.component.css']
})
export class AddfielddialogComponent implements OnInit {

  type?: string = "string";

  constructor(private tableSettingsService: TableSettingsService,
    private codeService: CodeService,
    @Inject(MAT_DIALOG_DATA) public tableIndex: number ) { }

  nameFormControl = new FormControl('', [
    Validators.pattern('[A-Za-z_$][a-zA-Z0-9_$]*'),
    Validators.required,
    this.uniqueFieldNameValidator()
  ])  

  ngOnInit(): void {
  }

  getTable() {
    return this.tableSettingsService
      .getTables()[this.tableIndex]
  }

  add() {
    const name = this.nameFormControl.value

    this.getTable().fields.push({
      name: name,
      type: this.type ?? ""
    });
    this.tableSettingsService.saveTables();
    if (this.codeService.currentTableIndex === this.tableIndex) {
      this.codeService.downloadCodeToViewer(this.codeService.currentDownloadType, this.codeService.currentFileName, this.tableIndex)
    }
  }

  get required() {
    return this.nameFormControl.hasError("required")
  }

  get nameInvalid() {
    return this.nameFormControl.hasError("pattern") ;
  }

  get fieldExists() {
    return this.nameFormControl.hasError('fieldExists');
  }

  uniqueFieldNameValidator(): ValidatorFn {
    const fieldNames = this.getTable().fields.map(field => field.name);

    return (control:AbstractControl): ValidationErrors | null => {
      return fieldNames.includes(control.value) ? {fieldExists: true} : null;
    }
  }

}
