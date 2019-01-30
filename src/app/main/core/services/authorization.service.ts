import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router, Route, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthorizationService implements CanActivate, CanActivateChild, CanLoad
{
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
    {

        console.log(state);
        return this.checkLogin(state.url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
    {
       nsole.log(state);
       return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean 
    {
        // check if package can to be lazy loaded
        // will be check package if is activate 
        // see /src/app/main/content/apps/apps.module.ts
        return true;
    }
    
    checkLogin(url?: string): boolean
    {
        if (this.authenticationService.check()) return true;
                 
        // Store the attempted URL for redirecting
        if (url) this.authenticationService.redirectUrl = url;

        // Navigate to the login page with extras
        this.router.navigate(['/apps/auth/login']);
        return false;
    }
}
