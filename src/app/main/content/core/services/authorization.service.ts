import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router, Route, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { ConfigService } from './../services/config.service';

@Injectable()
export class AuthorizationService implements CanActivate, CanActivateChild, CanLoad
{
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private configService: ConfigService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
    {
        return this.checkLogin(state.url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
    {
       return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean 
    {
        const url = `/${route.path}`;
        return this.checkLogin();
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
