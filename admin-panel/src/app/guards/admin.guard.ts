import { Injectable, Input } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Params,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AdminService } from '../services/admin.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean> | Promise<boolean> | boolean  {

    let roles = route.data['roles'] as Array<string>;

    if (!this.adminService.isAuthenticated(roles)) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
