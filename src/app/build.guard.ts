import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TableSettingsService } from './services/table-settings.service';

@Injectable({
  providedIn: 'root'
})
export class BuildGuard implements CanActivate {
  constructor(
    private router: Router,
    private tableSettingsService: TableSettingsService
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      if (this.tableSettingsService.currentProject === null) {
        this.router.navigate(['projects']);
      }
      this.router.navigate(['build', this.tableSettingsService.currentProject?.id, this.tableSettingsService.currentProject?.name])
      return Promise.resolve(true);
  }

}
