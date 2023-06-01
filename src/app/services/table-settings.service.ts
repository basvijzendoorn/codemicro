import { FlatTreeControl } from '@angular/cdk/tree';
import { Injectable } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Project, SupabaseService } from './supabase.service';

export interface FieldSettings {
  name: string,
  type: string
}

export interface TableSettings {
  name: string,
  fields: FieldSettings[],
}


@Injectable({
  providedIn: 'root'
})
export class TableSettingsService {

  tables: TableSettings[] = [];

  currentProject: Project | null = null;

  constructor(private supabaseService: SupabaseService) { 
  }

  setProject(project: Project) {
    this.currentProject = project;
    this.updateTables();
  }

  getTables() {
    return this.tables;
  }

  async updateTables() {
    var tablesFromSupabase = await this.supabaseService.supabase
      .from('Projects')
      .select('tables')
      .eq('id', this.currentProject?.id);
    
    if (tablesFromSupabase.data != null) {
      this.tables = tablesFromSupabase.data[0].tables;
    }
  }

  async saveTables() {
    await this.supabaseService.supabase
      .from('Projects')
      .update({tables: this.tables})
      .eq('id', this.currentProject?.id);
    this.updateTables();
  }

}
