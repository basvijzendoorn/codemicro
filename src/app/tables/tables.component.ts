import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { TableSettingsService } from '../services/table-settings.service';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  constructor(private tableSettingsService: TableSettingsService) { }

  ngOnInit(): void {
  }

  getTables() {
    return this.tableSettingsService.getTables();
  }

  add() {
  
  }
}
