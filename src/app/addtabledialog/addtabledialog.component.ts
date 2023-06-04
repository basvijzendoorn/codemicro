import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { CodeService, DownloadType } from '../services/code.service';
import { TableSettingsService } from '../services/table-settings.service';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-addtabledialog',
  templateUrl: './addtabledialog.component.html',
  styleUrls: ['./addtabledialog.component.css']
})
export class AddtabledialogComponent implements OnInit {

  constructor(private tableSettingsService: TableSettingsService,
              private codeService: CodeService,
              private chatService: ChatService) { }

  nameFormControl = new FormControl('', [
    Validators.pattern('[A-Z][a-zA-Z0-9_$]*'),
    Validators.required,
    this.uniqueTableNameValidator()
  ]);

  ngOnInit(): void {
  }


  add() {
    this.chatService.addTable(this.nameFormControl.value);
  }

  get required() {
    return this.nameFormControl.hasError("required");
  }

  get nameInvalid() {
    return this.nameFormControl.hasError("pattern");
  }

  get tableExists() {
    return this.nameFormControl.hasError('tableExists');
  }

  uniqueTableNameValidator(): ValidatorFn {
    const tableNames = this.tableSettingsService.getTables().map(table => table.name);

    return (control:AbstractControl): ValidationErrors | null => {
      return tableNames.includes(control.value) ? {tableExists: true} : null;
    }
  }



}
