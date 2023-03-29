import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CodeService } from '../services/code.service';
import { TableSettingsService } from '../services/table-settings.service';

@Component({
  selector: 'app-addfielddialog',
  templateUrl: './addfielddialog.component.html',
  styleUrls: ['./addfielddialog.component.css']
})
export class AddfielddialogComponent implements OnInit {

  constructor(private tableSettingsService: TableSettingsService,
    private codeService: CodeService,
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
    });
    if (this.codeService.tableIndex === this.tableIndex) {
      this.codeService.downloadCode(this.codeService.folderIndex, this.tableIndex)
    }
  }
}
