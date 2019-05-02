import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthorizationService } from '@horus/services/authorization.service';

const routes = [
    {
        path        : 'auth',
        loadChildren: './auth/auth.module#AuthModule',
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
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
    {
        path        : 'innova-concrete',
        loadChildren: './innova-concrete/innova-concrete.module#InnovaConcreteModule',
        canLoad     : [AuthorizationService]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AppsRoutingModule {}
