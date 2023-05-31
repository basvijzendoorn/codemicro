import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';
import { SupabaseService } from './services/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private supabaseService: SupabaseService
  ) {}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      
    const session = await this.supabaseService.supabase.auth.getSession();
    // alert(JSON.stringify(session.data));
    // alert(JSON.stringify(session.error));

    if (session.data.session === null) {
      this.router.navigate(['login'])
    }
    return Promise.resolve(true);
  }

}
