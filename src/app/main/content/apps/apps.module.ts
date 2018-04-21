import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatPaginatorIntl } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { AuthorizationService } from './../core/services/authorization.service';
import { FuseTranslationLoaderService } from './../../../../@fuse/services/translation-loader.service';
import { CustomMatPaginatorIntlService } from './../core/services/custom-mat-paginator-int.service';
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
        path        : 'review',
        loadChildren: './review/review.module#ReviewModule',
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
        private translate: TranslateService,
        private translationLoader: FuseTranslationLoaderService
    ){
        this.translationLoader.loadTranslations(english, spanish);
    }
}
