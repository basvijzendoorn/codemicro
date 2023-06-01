import { Component, Input } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-changeprojectdialog',
  templateUrl: './changeprojectdialog.component.html',
  styleUrls: ['./changeprojectdialog.component.css']
})
export class ChangeprojectdialogComponent {

  projectId: number = -1;
  name: string = "";

  constructor(private supabaseService: SupabaseService) {
  }

  setProjectId(projectId: number) {
    this.projectId = projectId;
    this.supabaseService.supabase.from('Projects').select('name').eq('id', this.projectId).then( (result) => {
      this.name = result.data?.at(0)?.name ?? "";
    })
  }

  getName() {
    return this.name;
  }

  async save(name: string) {
    await this.supabaseService.supabase.from('Projects').update({name: name}).eq('id', this.projectId).then( (result) => {
    })
    this.supabaseService.updateProjects();
  }

}
