import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CodeService } from '../services/code.service';
import { FieldSettings, TableSettingsService } from '../services/table-settings.service';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { randomInt, randomUUID } from 'crypto';

interface FieldDialogInit {
  settingsField: boolean
  tableIndex: number,
  fieldIndex?: number
}


@Component({
  selector: 'app-addfielddialog',
  templateUrl: './fielddialog.component.html',
  styleUrls: ['./fielddialog.component.css']
})
export class FielddialogComponent implements OnInit {

  type?: string = "string";
  relationshipType?: string = "onetomany";
  targetTable: string;

  constructor(private tableSettingsService: TableSettingsService,
    private codeService: CodeService,
    @Inject(MAT_DIALOG_DATA) public dialogInit: FieldDialogInit ) {
      const targTable = this.tableSettingsService.getTables().find(table => table.name != this.getTable().name)
      if (targTable === undefined) {
        this.targetTable = this.getTable().name;
      } else {
        this.targetTable = targTable.name;
      }
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
    if (this.dialogInit.settingsField) {
      if (this.getField()?.type === 'onetomany' || this.getField()?.type === 'manytoone' || this.getField()?.type === 'manytomany') {
        this.type = 'relationship';
        this.relationshipType = this.getField()?.type;
        const relid = this.getField()?.referenceId
        const relationship = this.tableSettingsService.getRelationships().find(relat => relat.id === relid);
        
        if (this.getField()?.type === 'onetomany' && relationship != undefined) {
          this.targetNameFormControl.setValue(relationship?.targetFieldName);
          this.targetTable = relationship?.targetTableName;
        } else if (this.getField()?.type === 'manytoone' && relationship != undefined) {
          this.targetNameFormControl.setValue(relationship.fieldName);
          this.targetTable = relationship.tableName;
        } else if (this.getField()?.type === 'manytomany' && relationship != undefined) {
          if (this.getField()?.name === relationship.fieldName) {
            this.targetNameFormControl.setValue(relationship?.targetFieldName);
            this.targetTable = relationship?.targetTableName;  
          } else {
            this.targetNameFormControl.setValue(relationship.fieldName);
            this.targetTable = relationship.tableName;  
          }
          this.intermediateTableNameFormControl.setValue(relationship.intermediateTableName);
        }
      } else {
        this.type = this.getField()?.type;
      }

      // this.type = this.getField()?.type;
      this.nameFormControl.setValue(this.getField()?.name)
    }
  }

  getTable() {
    return this.tableSettingsService
      .getTables()[this.dialogInit.tableIndex]
  }

  getTables() {
    return this.tableSettingsService.getTables();
  }

  getField(): FieldSettings | undefined {
    if (this.dialogInit.settingsField && this.dialogInit.fieldIndex != undefined) {
      return this.tableSettingsService
        .getTables()[this.dialogInit.tableIndex]
        .fields[this.dialogInit.fieldIndex];
    }
    return undefined;
  }

  getType() {
    // if (this.type === 'onetomany' || this.type === 'manytoone' || this.type === 'manytomany' || this.type === 'onetoone') {
    //   return 'relationship';
    // }
    return this.type;
  }

  getRelationship() {
    return this.relationshipType;
  }

  save() {
    if (this.dialogInit.settingsField && this.dialogInit.fieldIndex != undefined) {

      const relid = this.getTable().fields[this.dialogInit.fieldIndex].referenceId
      if (relid != undefined) {
        const tables = this.tableSettingsService.getTables();
        tables.forEach( (table, tableIndex) => {
          const fieldsToBeDeleted: number[] = []
          table.fields.forEach( (field, fieldIndex) => {
            if (field.referenceId == relid) {
              fieldsToBeDeleted.push(fieldIndex);
              // table.fields.splice(fieldIndex, 1);
            }
          });
          fieldsToBeDeleted.forEach((fieldIndex, index) => table.fields.splice(fieldIndex - index, 1));
        });
        const relationshipIndex = this.tableSettingsService.getRelationships().findIndex(rel => rel.id === relid)
        this.tableSettingsService.getRelationships().splice(relationshipIndex, 1);
      } else {
        this.getTable().fields.splice(this.dialogInit.fieldIndex, 1);
      }  
      // if (this.type === 'relationship') {
      //   this.saveEditRelationship();
      // } else {
      //   this.saveEditField();
      // }
    } 
    
    if (this.type === 'relationship') {
      this.addRelationship();
    } else {
      this.addField();
    }  
    // }
  }

  getIntermediateTableNamePlaceholder() {
    if (this.getType() === 'relationship' && this.getRelationship() === 'manytomany') {
      return this.getTable().name.toLowerCase() + "_" + this.targetTable.toLowerCase()
    }
    return "";
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

  getRandomChar() {
    return String.fromCharCode(97 + Math.floor(Math.random() * 26));
  }

  createRelationshipId() {
    const id = this.getRandomChar() + this.getRandomChar()
      + this.getRandomChar() + this.getRandomChar();
    return id;
  }

  addRelationship() {
    const fieldName = this.nameFormControl.value;
    const targetTable = this.targetTable;
    const targetFieldName = this.targetNameFormControl.value;
    const id = this.createRelationshipId();

    if (this.relationshipType === 'onetomany') {
      this.tableSettingsService.getRelationships().push({
        id: id,
        type: 'onetomany',
        tableName: this.getTable().name,
        fieldName: fieldName,
        targetTableName: targetTable,
        targetFieldName: targetFieldName
      })

      this.getTable().fields.push({
        type: "onetomany",
        name: fieldName,
        referenceId: id
      })

      this.getTables().find(table => table.name === targetTable)?.fields.push({
        type: "manytoone",
        name: targetFieldName,
        referenceId: id
      })

      this.tableSettingsService.saveTables();
    } else if (this.relationshipType === 'manytoone') {

      this.tableSettingsService.getRelationships().push({
        id: id,
        type: 'onetomany',
        tableName: targetTable,
        fieldName: targetFieldName,
        targetTableName: this.getTable().name,
        targetFieldName: fieldName
      })

      this.getTable().fields.push({
        type: "manytoone",
        name: fieldName,
        referenceId: id
      })

      this.getTables().find(table => table.name === targetTable)?.fields.push({
        type: "onetomany",
        name: targetFieldName,
        referenceId: id
      })

      this.tableSettingsService.saveTables();
    } else if (this.relationshipType === 'manytomany') {
      const intermediateTableName = this.intermediateTableNameFormControl.value;

      this.tableSettingsService.getRelationships().push({
        id: id,
        type: 'manytomany',
        tableName: this.getTable().name,
        fieldName: fieldName,
        targetTableName: targetTable,
        targetFieldName: targetFieldName,
        intermediateTableName: intermediateTableName
      });

      this.getTable().fields.push({
        type: "manytomany",
        name: fieldName,
        referenceId: id
      });

      this.getTables().find(table => table.name === targetTable)?.fields.push({
        type: "manytomany",
        name: targetFieldName,
        referenceId: id
      });
    }
  }

  addField() {
    const name = this.nameFormControl.value

    this.getTable().fields.push({
      name: name,
      type: this.type ?? ""
    });
    this.tableSettingsService.saveTables();
    if (this.codeService.currentTableIndex === this.dialogInit.tableIndex) {
      this.codeService.downloadCodeToViewer(this.codeService.currentDownloadType, this.codeService.currentFileName, this.dialogInit.tableIndex)
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
      return fieldNames.filter(name => name != this.getField()?.name).includes(control.value) ? {fieldExists: true} : null;
    }
  }

}
