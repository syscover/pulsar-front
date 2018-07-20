import { Injectable } from '@angular/core';
import { FuseNavigation } from '@fuse/types';
import { ConfigService } from './config.service';
import { Package } from './../../apps/admin/admin.models';
import { environment } from 'environments/environment';
import * as _ from 'lodash';

@Injectable()
export class NavigationService
{
    constructor(
        private configService: ConfigService
    ) 
    {}

    getNavigation(navigation: FuseNavigation[]): FuseNavigation[]
    {
        const packages: Package[] = this.configService.get('packages');
        const menuItems = [];
        
        for (const item of navigation[0].children)
        {     
            const pkg = <Package>_.find(packages, {root: item.id});
            if (pkg && pkg.active) menuItems.push(item);
        }

        if (environment.debug) console.log('DEBUG - menu items: ', menuItems);

        navigation[0].children = menuItems;
        
        return navigation;
    }
}
