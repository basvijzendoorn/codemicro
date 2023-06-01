import { Component } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-addprojectdialog',
  templateUrl: './addprojectdialog.component.html',
  styleUrls: ['./addprojectdialog.component.css']
})
export class AddprojectdialogComponent {

  constructor(private supabaseService: SupabaseService) {

  }

  add(name: string) {
    this.supabaseService.newProject(name);
  }
}
