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

  public item = {
    field: [ '', [ Validators.required ] ]
  };

  form = this.fb.group({
  });

  constructor(private tableSettingsService: TableSettingsService,
    private fb:FormBuilder ) { }

  //@ViewChild('tn') tn: any;

  // formGroup: FormGroup = new FormGroup({
  //   1: new FormControl(''),
  //   2: new FormControl('')
  // })


  ngOnInit(): void {
    this.tableSettingsList = JSON.parse(JSON.stringify(this.tableSettingsService.getTables()));

    const tableFormControls: FormControl[] = []

    this.tableSettingsList.forEach(tableSettings => {
       tableFormControls.push(this.createTable(tableSettings.name));
    })

    this.form = this.fb.group({
      tables: this.fb.array(tableFormControls)
    })
  }

  public createTable(tableName: string): FormControl {
    const tableFormController = this.fb.control({
      field: [ '', [ Validators.required ] ]
    });
    tableFormController.setValue(tableName);
    return tableFormController;
  }

  getTables(): FormControl[] {
    // return this.tableSettings;
    return (this.form.controls["tables"] as FormArray).controls as FormControl[];
  }

  drop(event: CdkDragDrop<fieldSettings[]>) {
    // moveItemInArray(this.tableSettings, event.previousIndex, event.currentIndex);
    moveItemInArray(this.getTables(), event.previousIndex, event.currentIndex);
    moveItemInArray(this.tableSettingsList, event.previousIndex, event.currentIndex);
  }

  delete(tableIndex: number) {
    this.getTables().splice(tableIndex, 1);
    this.tableSettingsList.splice(tableIndex, 1);
  }

  save() {
    this.getTables().forEach((tableFormControl, index) => {
        this.tableSettingsList[index].name = tableFormControl.value
    });
    this.tableSettingsService.tables = this.tableSettingsList
  }
}
