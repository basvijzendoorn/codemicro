import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddfielddialogComponent } from '../addfielddialog/addfielddialog.component';
import { AddtabledialogComponent } from '../addtabledialog/addtabledialog.component';
import { TableSettingsService } from '../services/table-settings.service';
import { TablesettingsdialogComponent } from '../tablesettingsdialog/tablesettingsdialog.component';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  constructor(private tableSettingsService: TableSettingsService,
    private dialog: MatDialog) { }

  expanded: boolean[] = this.tableSettingsService.getTables().map(table=> false);

  ngOnInit(): void {
  }

  getExpanded(tableIndex:number ) {
    return this.expanded[tableIndex];
  }

  getTables() {
    return this.tableSettingsService.getTables();
  }

  opened(tableIndex: number){
    this.expanded[tableIndex] = true;
  }

  closed(tableIndex: number) {
    this.expanded[tableIndex] = false;
  }

  addTable() {
    this.dialog.open(AddtabledialogComponent)
  }

  openTableSettingsDialog() {
    this.dialog.open(TablesettingsdialogComponent)
  }
}
