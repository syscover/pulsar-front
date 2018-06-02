import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';

import { fuseConfig } from './fuse-config';

import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';

import { CoreModule } from './main/content/core/core.module';

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
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        TranslateModule.forRoot(),

        // Fuse Main and Shared modules
        FuseModule.forRoot(fuseConfig),
        FuseSharedModule,
        FuseMainModule,
        
        // DH2
        CoreModule
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
