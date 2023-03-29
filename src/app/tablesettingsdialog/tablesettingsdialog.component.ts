import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { fieldSettings, tableSettings, TableSettingsService } from '../services/table-settings.service';

@Component({
  selector: 'app-tablesettingsdialog',
  templateUrl: './tablesettingsdialog.component.html',
  styleUrls: ['./tablesettingsdialog.component.css']
})
export class TablesettingsdialogComponent implements OnInit {

  tableSettingsList: tableSettings[] = [];
  form = this.formBuilder.group({});

  constructor(private tableSettingsService: TableSettingsService,
    private formBuilder:FormBuilder ) { }

  ngOnInit(): void {
    this.tableSettingsList = JSON.parse(JSON.stringify(this.tableSettingsService.getTables()));

    const tableFormControls: FormControl[] = []

    this.tableSettingsList.forEach(tableSettings => {
       tableFormControls.push(this.createTable(tableSettings.name));
    })

    this.form = this.formBuilder.group({
      tables: this.formBuilder.array(tableFormControls)
    })
  }

  public createTable(tableName: string): FormControl {
    const tableFormController = this.formBuilder.control({
      field: [ '', [ Validators.required ] ]
    });
    tableFormController.setValue(tableName);
    return tableFormController;
  }

  getTablesFormControlList(): FormControl[] {
    return (this.form.controls["tables"] as FormArray).controls as FormControl[];
  }

  drop(event: CdkDragDrop<fieldSettings[]>) {
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
    this.tableSettingsService.tables = this.tableSettingsList
  }
}
