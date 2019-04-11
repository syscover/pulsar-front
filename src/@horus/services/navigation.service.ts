import { Injectable } from '@angular/core';
import { FuseNavigation, FuseNavigationItem } from '@fuse/types';
import { ConfigService } from './config.service';
import { Package } from '../../app/main/apps/admin/admin.models';
import { environment } from 'environments/environment';
import { AuthenticationService } from './authentication.service';
import * as _ from 'lodash';

@Injectable()
export class NavigationService
{
    constructor(
        private _configService: ConfigService,
        private _authenticationService: AuthenticationService
    ) 
    {}

    getNavigation(navigation: FuseNavigation[]): FuseNavigation[]
    {
        // check packages
        navigation[0].children = this.checkPackages(navigation[0].children);

        // in login page there isn't user
        if (this._authenticationService.user())
        {
            const permissions = this._authenticationService.user().profile.permissions;
            // check resources in navigation
            navigation[0].children = this.checkResources(navigation[0].children, permissions);
        }

        return navigation;
    }

    private checkPackages(navigation): any
    {
        const navigationResponse = [];
        const packages: Package[] = this._configService.get('packages');

        // check if packages is publish
        for (const item of navigation)
        {
            const pkg = <Package>_.find(packages, {root: item.id});
            if (pkg && pkg.active) navigationResponse.push(item);
        }

        if (environment.debug) console.log('DEBUG - menu items: ', navigationResponse);

        return navigationResponse;
    }

    private checkResources(navigation, permissions): FuseNavigation[]
    {
        const navigationResponse: FuseNavigation[] = [];

        for (const item of navigation)
        {
            if (item.children)
            {
                // call function recursive
                item.children = this.checkResources(item.children, permissions);
            }

            // check if has resource and has access permission
            if (item.resource && _.find(permissions, {'resource_id': item.resource, 'action_id': 'access'}))
            {
                navigationResponse.push(item);
            }
            else if (!item.resource)
            {
                navigationResponse.push(item);
            }
        }

        return navigationResponse;
    }
}
