import { Injectable } from '@angular/core';
import { navigation } from 'app/navigation/navigation';
import { environment } from './../../../../../environments/environment';

@Injectable()
export class NavigationService
{
    navigation: any;

    constructor() 
    {
        // Navigation data
        this.navigation = navigation;
    }

    getNavigation()
    {
        const packageMenu = this.navigation[0].children;
        console.log(this.navigation[0].children);
        return this.navigation;
    }
}
