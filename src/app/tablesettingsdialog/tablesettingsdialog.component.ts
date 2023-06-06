import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { CodeService, DownloadType } from '../services/code.service';
import { FieldSettings, Table, TableSettingsService } from '../services/table-settings.service';

@Component({
  selector: 'app-tablesettingsdialog',
  templateUrl: './tablesettingsdialog.component.html',
  styleUrls: ['./tablesettingsdialog.component.css']
})
export class TablesettingsdialogComponent implements OnInit {

  tableSettingsList: Table[] = [];
  form = this.formBuilder.group({});

  constructor(private tableSettingsService: TableSettingsService,
    private formBuilder:FormBuilder,
    private codeService: CodeService ) { }

  ngOnInit(): void {
    this.tableSettingsList = JSON.parse(JSON.stringify(this.tableSettingsService.getTables()));

    const tableFormControls: FormControl[] = []

    this.tableSettingsList.forEach(tableSettings => {
       tableFormControls.push(this.createTableFormControl(tableSettings.name));
    })

    this.form = this.formBuilder.group({
      tables: this.formBuilder.array(tableFormControls)
    })
  }

  public createTableFormControl(tableName: string): FormControl {
    const tableFormController = new FormControl('', [
      Validators.pattern('[A-Z][a-zA-Z0-9_$]*'),
      Validators.required,
      // this.uniqueTableNameValidator(tableName)
    ])
    tableFormController.setValue(tableName);
    return tableFormController;
  }

  getTablesFormControlList(): FormControl[] {
    return (this.form.controls["tables"] as FormArray).controls as FormControl[];
  }

  drop(event: CdkDragDrop<FieldSettings[]>) {
    moveItemInArray(this.getTablesFormControlList(), event.previousIndex, event.currentIndex);
    moveItemInArray(this.tableSettingsList, event.previousIndex, event.currentIndex);
  }

  delete(tableIndex: number) {
    this.getTablesFormControlList().splice(tableIndex, 1);
    this.tableSettingsList.splice(tableIndex, 1);
  }

  save() {
    this.getTablesFormControlList().forEach((tableFormControl, index) => {
        this.tableSettingsList[index].name = tableFormControl.value
    });
    this.tableSettingsService.tableSettings.tables = this.tableSettingsList
    this.tableSettingsService.saveTables()
    if (this.codeService.currentDownloadType === DownloadType.FlywayInit) {
      this.codeService.downloadCodeToViewer(DownloadType.FlywayInit, this.codeService.currentFileName);
    }
  }

  // get required() {
  //   return this.nameFormControl.hasError("required");
  // }

  // get nameInvalid() {
  //   return this.nameFormControl.hasError("pattern");
  // }

  // get tableExists() {
  //   return this.nameFormControl.hasError('tableExists');
  // }

  formControlsHaveErrors() {
    return this.getTablesFormControlList()
      .map(formControl => formControl.hasError('pattern') || formControl.hasError('required'))
      .includes(true)
  }

  noDoubleTableNames() {
    const tableNames = this.getTablesFormControlList().map(formControl => formControl.value)
    return new Set(tableNames).size < tableNames.length;
  }

  // uniqueTableNameValidator(currentTableName: string): ValidatorFn {
  //   const tableNames = this.tableSettingsService.getTables()
  //     .map(table => table.name)
  //     .filter(tableName => tableName != currentTableName)

  //   return (control:AbstractControl): ValidationErrors | null => {
  //     const tableFormControls = this.getTablesFormControlList();
  //     // const tableNames = tableFormControls.filter(formControl => formControl === control)
  //     //   .map(formControl => formControl.value)

  //     return tableNames.includes(control.value) ? {tableExists: true} : null;
  //   }
  // }

}
