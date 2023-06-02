import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TableSettingsService } from './services/table-settings.service';
import { SupabaseService } from './services/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class BuildAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private tableSettingsService: TableSettingsService,
    private supabaseService: SupabaseService
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      await this.supabaseService.updateProjects();
      if (! this.supabaseService.getProjects().map(project => project.id).includes(parseInt(route.params['id']))) {
        this.router.navigate(['projects']);
      }
      //this.router.navigate(['build', this.tableSettingsService.currentProject?.id, this.tableSettingsService.currentProject?.name])
      return Promise.resolve(true);
  }

}