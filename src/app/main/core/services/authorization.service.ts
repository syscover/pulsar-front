import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router, Route, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Permission } from '../../apps/admin/admin.models';
import * as _ from 'lodash';
import {MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class AuthorizationService implements CanActivate, CanActivateChild, CanLoad
{
    private _permissions: Permission[] = [];
    private _translations: Object = {};

    constructor(
        private _authenticationService: AuthenticationService,
        private _router: Router,
        private _translateService: TranslateService,
        private _snackBar: MatSnackBar
    ) {
        this._permissions = _authenticationService.user() ? _authenticationService.user().profile.permissions : null;
        this._translateService
            .get([
                'APPS.OK',
                'APPS.DENIED_PERMISSION'
            ])
            .subscribe(response => {
                this._translations = response;
            });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
    {
        if (! this.checkLogin(state.url)) return false;

        if (route.data.action && route.data.resource)
        {
            const permission = _.find(this._permissions, {'resource_id': route.data.resource, 'action_id': route.data.action});

            if (permission) {
                return true;
            }
            else {
                this._snackBar.open(
                    this._translations['APPS.DENIED_PERMISSION'],
                     this._translations['APPS.OK'],
                    {
                        verticalPosition: 'top',
                        duration        : 3000
                    }
                );
                return false;
            }
        }

        return true;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
    {
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
        if (this._authenticationService.check()) return true;
                 
        // Store the attempted URL for redirecting
        if (url) this._authenticationService.redirectUrl = url;

        // Navigate to the login page with extras
        this._router.navigate(['/apps/auth/login']);
        return false;
    }

    refreshPermissions(): void
    {
        this._permissions = this._authenticationService.user().profile.permissions;
    }
}
