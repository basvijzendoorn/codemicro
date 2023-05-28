import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { CodeService, DownloadType } from '../services/code.service';
import { TableSettingsService } from '../services/table-settings.service';

@Component({
  selector: 'app-addtabledialog',
  templateUrl: './addtabledialog.component.html',
  styleUrls: ['./addtabledialog.component.css']
})
export class AddtabledialogComponent implements OnInit {

  constructor(private tableSettingsService: TableSettingsService,
              private codeService: CodeService,
              private chatService: ChatService) { }

  ngOnInit(): void {
  }

  add(name: string) {
    this.chatService.addTable(name)
  }

}
