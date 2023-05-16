import { Component, OnInit } from '@angular/core';
import { CodeService, DownloadType } from '../services/code.service';
import { TableSettingsService } from '../services/table-settings.service';

@Component({
  selector: 'app-addtabledialog',
  templateUrl: './addtabledialog.component.html',
  styleUrls: ['./addtabledialog.component.css']
})
export class AddtabledialogComponent implements OnInit {

  constructor(private tableSettingsService: TableSettingsService,
              private codeService: CodeService) { }

  ngOnInit(): void {
  }

  add(name: string) {
    this.tableSettingsService.getTables().push({
      name: name,
      fields: []
    })
    if (this.codeService.currentDownloadType === DownloadType.FlywayInit) {
      this.codeService.downloadCodeToViewer(DownloadType.FlywayInit, this.codeService.currentFileName);
    }
  }

}
