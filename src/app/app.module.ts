import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';

// @horus
import { HorusModule } from '@horus/horus.module';
import { CoreModule } from 'app/main/core/core.module';

// @horus
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

        // @horus
        CoreModule,
        HorusModule
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
