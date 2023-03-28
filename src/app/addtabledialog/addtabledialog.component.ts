import { Component, OnInit } from '@angular/core';
import { TableSettingsService } from '../services/table-settings.service';

@Component({
  selector: 'app-addtabledialog',
  templateUrl: './addtabledialog.component.html',
  styleUrls: ['./addtabledialog.component.css']
})
export class AddtabledialogComponent implements OnInit {

  constructor(private tableSettingsService: TableSettingsService) { }

  ngOnInit(): void {
  }

  add(name: string) {
    this.tableSettingsService.getTables().push({
      name: name,
      fields: []
    })
  }

}
