import { Injectable } from '@angular/core';
import { navigation } from 'app/navigation/navigation';
import { ConfigService } from './config.service';
import { environment } from './../../../../../environments/environment';
import * as _ from 'lodash';

@Injectable()
export class NavigationService
{
    navigation: any;

    constructor(
        private configService: ConfigService
    ) 
    {
        // Navigation data
        this.navigation = navigation;
    }

    getNavigation()
    {
        const packages  = this.configService.get('packages');
        const menuItems = [];
        
        for (const item of this.navigation[0].children) 
        {     
            const pkg = _.find(packages, {root: item.id});
            if (pkg && pkg.active) menuItems.push(item);
        }

        if (environment.debug) console.log('DEBUG - menu intens: ', menuItems);

        this.navigation[0].children = menuItems;
        
        return this.navigation;
    }
}
