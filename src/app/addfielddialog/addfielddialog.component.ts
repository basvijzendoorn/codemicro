import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableSettingsService } from '../services/table-settings.service';

@Component({
  selector: 'app-addfielddialog',
  templateUrl: './addfielddialog.component.html',
  styleUrls: ['./addfielddialog.component.css']
})
export class AddfielddialogComponent implements OnInit {

  constructor(private tableSettingsService: TableSettingsService,
    @Inject(MAT_DIALOG_DATA) public tableIndex: number ) { }

  ngOnInit(): void {
  }

  getTable() {
    return this.tableSettingsService
      .getTables()[this.tableIndex]
  }

  add(name: string) {
    this.getTable().fields.push({
      name: name
    })
  }
}
