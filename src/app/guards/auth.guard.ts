import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/index';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private _auth:AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            let rol = this._auth.getRole();
            if(route.url[0].path == "adminFleet" && (rol == "AdminGlobal" || rol == "AdminFlota")){
                return true;
            }else if(route.url[0].path == "adminClub" && (rol == "AdminGlobal" || rol == "AdminClub")){
                return true;
            }else if(route.url[0].path == "operaciones" && (rol == "AdminGlobal" || rol == "operaciones")){
                  return true;
            }else{
              return false;
            }
            // logged in so return true

        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
