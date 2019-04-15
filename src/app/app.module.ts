import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';

// HORUS
import { HorusModule } from '@horus/horus.module';
import { CoreModule } from 'app/main/core/core.module';

// DH2
const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'apps/auth/login',
        pathMatch: 'full'
    },
    {
        path        : 'apps',
        loadChildren: 'app/main/apps/apps.module#AppsModule'
    },
    {
        path        : 'pages',
        loadChildren: 'app/main/pages/pages.module#FusePagesModule'
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

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,

        // HORUS
        HorusModule,
        CoreModule
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
