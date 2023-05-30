import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(private supabaseService: SupabaseService) { }

  ngOnInit(): void {
  }

  openProject() {
    this.supabaseService.getProjects();
  }

}
