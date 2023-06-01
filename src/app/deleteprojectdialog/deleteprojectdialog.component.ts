import { Component } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-deleteprojectdialog',
  templateUrl: './deleteprojectdialog.component.html',
  styleUrls: ['./deleteprojectdialog.component.css']
})
export class DeleteprojectdialogComponent {

  constructor(private supabaseService: SupabaseService) {
  }

  projectId: number = -1;

  setProjectId(projectId: number) {
    this.projectId = projectId;
  }

  async remove() {
    await this.supabaseService.supabase.from('Projects').delete().eq('id', this.projectId);
    this.supabaseService.updateProjects();
  }
}
