import { Component } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { Router } from '@angular/router';
import { TableSettingsService } from '../services/table-settings.service';

@Component({
  selector: 'app-addprojectdialog',
  templateUrl: './addprojectdialog.component.html',
  styleUrls: ['./addprojectdialog.component.css']
})
export class AddprojectdialogComponent {

  constructor(private supabaseService: SupabaseService,
    private tableSettingsService: TableSettingsService,
    private router: Router) {

  }

  async add(name: string) {
    const {data, error } = await this.supabaseService.newProject(name);
    if (error === null && data != null) {
      this.router.navigate(['build', data[0]['id'], data[0]['name']]);
    }
  }
}
