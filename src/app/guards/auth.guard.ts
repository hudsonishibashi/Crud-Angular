import { AuthService } from './../login/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
      const currentUser = this.authService.currentUserValue;
      const isAdminPage = route.data.roles && route.data.roles.indexOf(true) != -1;
      if (currentUser && currentUser.admin){
        if (!isAdminPage) {
          this.router.navigate(['home']);
          return false;
        } 
        return true;
      } else if (currentUser && !currentUser.admin) {
        if (isAdminPage) {
          this.router.navigate(['common']);
          return false;
        }
        return true;
      }
        this.router.navigate(['login']);
        return false;
  }
}
