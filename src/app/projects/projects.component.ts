import { Component, OnInit } from '@angular/core';
import { Project, SupabaseService } from '../services/supabase.service';
import { MatDialog } from '@angular/material/dialog';
import { AddprojectdialogComponent } from '../addprojectdialog/addprojectdialog.component';
import { ChangeprojectdialogComponent } from '../changeprojectdialog/changeprojectdialog.component';
import { DeleteprojectdialogComponent } from '../deleteprojectdialog/deleteprojectdialog.component';
import { TableSettingsService } from '../services/table-settings.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(private supabaseService: SupabaseService,
      private tableSettingsService: TableSettingsService,
      private matDialog: MatDialog,
      private router: Router
      ) { }

  menuSelectedProject: number = 0;

  ngOnInit(): void {
    this.supabaseService.updateProjects();
  }

  createNewProject() {
    const dialog = this.matDialog.open(AddprojectdialogComponent);
  }

  changeProject() {
    const dialog = this.matDialog.open(ChangeprojectdialogComponent);
    dialog.componentInstance.setProjectId(this.menuSelectedProject);
  }

  deleteProject() {
    const dialog = this.matDialog.open(DeleteprojectdialogComponent);
    dialog.componentInstance.setProjectId(this.menuSelectedProject);
  }

  openProject(project: Project) {
    this.tableSettingsService.setProject(project);
    this.router.navigate(['build', project.id, project.name]);
    // this.supabaseService.getProjects();
  }

  getProjects() {
    return this.supabaseService.getProjects();
  }

}
