import { CoreModule } from './main/content/core/core.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';
import { SharedModule } from './core/modules/shared.module';
import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { FuseConfigService } from './core/services/config.service';
import { FuseNavigationService } from './core/components/navigation/navigation.service';
import { FuseSampleModule } from './main/content/apps/sample/sample.module';

import { AdminModule } from './main/content/apps/admin/admin.module';

const appRoutes: Routes = [
    { 
        path: '', 
        redirectTo: 'apps/auth/login', 
        pathMatch: 'full' 
    },
    {
        path        : 'apps',
        loadChildren: './main/content/apps/apps.module#AppsModule'
    },
    {
        path        : 'pages',
        loadChildren: './main/content/pages/pages.module#FusePagesModule'
    },
    {
        path      : '**',
        redirectTo: 'pages/errors/error-404'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        SharedModule,
        TranslateModule.forRoot(),
        FuseMainModule,

        CoreModule,
        FuseSampleModule
    ],
    providers   : [
        FuseSplashScreenService,
        FuseConfigService,
        FuseNavigationService
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
