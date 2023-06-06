import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CodeService } from '../services/code.service';
import { TableSettingsService } from '../services/table-settings.service';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-addfielddialog',
  templateUrl: './addfielddialog.component.html',
  styleUrls: ['./addfielddialog.component.css']
})
export class AddfielddialogComponent implements OnInit {

  type?: string = "string";
  relationship?: string = "onetomany";
  targetTable: string;

  constructor(private tableSettingsService: TableSettingsService,
    private codeService: CodeService,
    @Inject(MAT_DIALOG_DATA) public tableIndex: number ) {
      this.targetTable = this.getTable().name;
     }

  nameFormControl = new FormControl('', [
    Validators.pattern('[A-Za-z_$][a-zA-Z0-9_$]*'),
    Validators.required,
    this.uniqueFieldNameValidator()
  ]);

  targetNameFormControl = new FormControl('', [
    Validators.pattern('[A-Za-z_$][a-zA-Z0-9_$]*'),
    Validators.required,
  ]);

  intermediateTableNameFormControl = new FormControl('', [
    Validators.pattern('[A-Za-z_$][a-zA-Z0-9_$]*'),
    Validators.required,
  ])

  ngOnInit(): void {
  }

  getTable() {
    return this.tableSettingsService
      .getTables()[this.tableIndex]
  }

  getTables() {
    return this.tableSettingsService.getTables();
  }

  getType() {
    return this.type;
  }

  getRelationship() {
    return this.relationship;
  }

  add() {
    if (this.type === 'relationship') {
      this.addRelationship();
    } else {
      this.addField();
    }
  }

  getFieldNamePlaceholder() {
    if (this.getType() === 'relationship') {
      if (this.getRelationship() === 'onetomany') {
        return this.targetTable.toLowerCase() + 's';
      } else if (this.getRelationship() === 'manytoone') {
        return this.targetTable.toLowerCase() +'_id';
      } else if (this.getRelationship() === 'manytomany') {
        return this.targetTable.toLowerCase() + 's'; 
      } else if (this.getRelationship() === 'onetoone') {
        return this.targetTable.toLowerCase();
      }
    }
    return "";
  }

  getFieldNameHint() {
    if (this.getType() === 'relationship') {
      if (this.getRelationship() === 'onetomany') {
        return "List field at table " + this.getTable().name + '.';
      } else if (this.getRelationship() === 'manytoone') {
        return "Foreign key field at table " + this.getTable().name + '.';
      } else if (this.getRelationship() === 'manytomany') {
        return "List field at table " + this.getTable().name + '.';
      } else if (this.getRelationship() === 'onetoone') {
        return "Field at table " + this.getTable().name + ".";
      }
    }
    return "";
  }

  getTargetFieldNamePlaceholder() {
    if (this.getType() === 'relationship') {
      if (this.getRelationship() === 'onetomany') {
        return this.getTable().name.toLowerCase() +'_id';
      } else if (this.getRelationship() === 'manytoone') {
        return this.getTable().name.toLowerCase() + 's';
      } else if (this.getRelationship() === 'manytomany') {
        return this.getTable().name.toLowerCase() + 's'; 
      } else if (this.getRelationship() === 'onetoone') {
        return this.getTable().name.toLowerCase();
      }
    }
    return "";
  }

  getTargetFieldNameHint() {
    if (this.getType() === 'relationship') {
      if (this.getRelationship() === 'onetomany') {
        return "Foreign key field at table " + this.targetTable + '.';
      } else if (this.getRelationship() === 'manytoone') {
        return "List field at table " + this.targetTable + ".";
      } else if (this.getRelationship() === 'manytomany') {
        return "List field at table " + this.targetTable + ".";
      } else if (this.getRelationship() === 'onetoone') {
        return "Field at table " + this.targetTable + '.';
      }
    }
    return "";

  }

  addRelationship() {
    if (this.relationship === 'onetomany') {
      const fieldName = this.nameFormControl.value;
      const targetTable = this.targetTable;
      const targetFieldName = this.targetNameFormControl.value;

      this.tableSettingsService.getRelationships().push({
        type: 'onetomany',
        tableName: this.getTable().name,
        fieldName: fieldName,
        targetTableName: targetTable,
        targetFieldName: targetFieldName
      })

      // this.getTable().fields.push({
      //   name: fieldName,
      //   type: 'onetomany',
      //   relationship: {
      //     targetField: targetFieldName,
      //     targetTable: targetTable
      //   }
      // });

      // this.getTables().find(table => table.name === targetTable)?.fields.push({
      //   name: targetFieldName,
      //   type: 'manytoone',
      //   relationship: {
      //     targetField: fieldName,
      //     targetTable: this.getTable().name
      //   }
      // });

      this.tableSettingsService.saveTables();
    }
  }

  addField() {
    const name = this.nameFormControl.value

    this.getTable().fields.push({
      name: name,
      type: this.type ?? ""
    });
    this.tableSettingsService.saveTables();
    if (this.codeService.currentTableIndex === this.tableIndex) {
      this.codeService.downloadCodeToViewer(this.codeService.currentDownloadType, this.codeService.currentFileName, this.tableIndex)
    }

  }

  get required() {
    return this.nameFormControl.hasError("required")
  }

  get nameInvalid() {
    return this.nameFormControl.hasError("pattern") ;
  }

  get fieldExists() {
    return this.nameFormControl.hasError('fieldExists');
  }

  uniqueFieldNameValidator(): ValidatorFn {
    const fieldNames = this.getTable().fields.map(field => field.name);

    return (control:AbstractControl): ValidationErrors | null => {
      return fieldNames.includes(control.value) ? {fieldExists: true} : null;
    }
  }

}
