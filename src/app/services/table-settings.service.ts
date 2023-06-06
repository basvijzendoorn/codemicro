import { FlatTreeControl } from '@angular/cdk/tree';
import { Injectable } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Project, SupabaseService } from './supabase.service';

export interface FieldSettings {
  name: string,
  type: string,
}

export interface Table {
  name: string,
  fields: FieldSettings[],
}

export interface Relationship {
  type: string,
  tableName: string,
  fieldName: string,
  targetTableName: string,
  targetFieldName: string,
  intermediateTableName?: string
}

export interface TableSettings {
  tables: Table[],
  relationships: Relationship[]
}


@Injectable({
  providedIn: 'root'
})
export class TableSettingsService {

  tableSettings: TableSettings = {
    tables: [],
    relationships: []
  }

  // tables: Table[] = [];
  // relationships: Relationship[] = [];

  currentProject: Project | null = null;

  constructor(private supabaseService: SupabaseService) { 
  }

  setProject(project: Project) {
    this.currentProject = project;
    this.updateTables();
  }

  getTables() {
    return this.tableSettings.tables;
  }

  getRelationships() {
    return this.tableSettings.relationships;
  }

  async updateTables() {
    var tablesFromSupabase = await this.supabaseService.supabase
      .from('Projects')
      .select('tables')
      .eq('id', this.currentProject?.id);
    
    if (tablesFromSupabase.data != null) {
      this.tableSettings = tablesFromSupabase.data[0].tables;
    }
  }

  async saveTables() {
    await this.supabaseService.supabase
      .from('Projects')
      .update({tables: this.tableSettings})
      .eq('id', this.currentProject?.id);
    this.updateTables();
  }

}
