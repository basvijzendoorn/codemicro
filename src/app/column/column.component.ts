import { Component, OnInit } from '@angular/core';
import { CodeService } from '../services/code.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})

export class ColumnComponent implements OnInit {
  constructor(private codeservice: CodeService) {
  }

  getFileName() {
    return this.codeservice.getCurrentFileName();
  }

  ngOnInit(): void {
  }
}
