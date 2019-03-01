import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatPaginatorIntl } from '@angular/material';
import { AuthorizationService } from '../core/services/authorization.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { CustomMatPaginatorIntlService } from '../core/services/custom-mat-paginator-int.service';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

const routes = [
    {
        path        : 'auth',
        loadChildren: './auth/auth.module#AuthModule',
    },
    {
        path        : 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canLoad     : [AuthorizationService]
    },
    {
        path        : 'admin',
        loadChildren: './admin/admin.module#AdminModule',
        canLoad     : [AuthorizationService]
    },
    {
        path        : 'update',
        loadChildren: './update/update.module#UpdateModule',
        canLoad     : [AuthorizationService]
    },
    {
        path        : 'cms',
        loadChildren: './cms/cms.module#CmsModule',
        canLoad     : [AuthorizationService]
    },
    {
        path        : 'crm',
        loadChildren: './crm/crm.module#CrmModule',
        canLoad     : [AuthorizationService]
    },
    {
        path        : 'market',
        loadChildren: './market/market.module#MarketModule',
        canLoad     : [AuthorizationService]
    },
    {
        path        : 'wine',
        loadChildren: './wine/wine.module#WineModule',
        canLoad     : [AuthorizationService]
    },
    {
        path        : 'review',
        loadChildren: './review/review.module#ReviewModule',
        canLoad     : [AuthorizationService]
    },
    {
        path        : 'forem',
        loadChildren: './forem/forem.module#ForemModule',
        canLoad     : [AuthorizationService]
    },
    {
        path        : 'bcci',
        loadChildren: './bcci/bcci.module#BcciModule',
        canLoad     : [AuthorizationService]
    },
];


@NgModule({
    imports     : [
        RouterModule.forChild(routes)
    ],
    declarations: [],
    providers: [{
        provide: MatPaginatorIntl, 
        useClass: CustomMatPaginatorIntlService
    }]
})
export class AppsModule
{
    constructor(
        private _translationLoader: FuseTranslationLoaderService
    ) {
        this._translationLoader.loadTranslations(english, spanish);
    }
}
