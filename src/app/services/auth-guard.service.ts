import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router:Router, private authService: AuthServiceService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

    this.authService.user$.pipe(map(user => {
      if (user) return true
      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url }})
    }))
    return false
  }
}
