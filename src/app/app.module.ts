import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';
import { RouteReuseStrategy } from '@angular/router';
import { MainModule } from './main/main.module';
import { CustomReuseStrategy } from './shared/router/custom-reuse-srtrategy';
import { ConfigLoader } from './core/services/config/config.loader';
import { ConfigService } from './core/services/config/config.service';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { InterceptorXHRBackend } from './core/services/interceptor.service';

import { PackageGraphQLService } from './admin/package/package-graphql.service';
import { FieldGraphQLService } from './admin/field/field-graphql.service';
import { CoreService } from './shared/super/core.service';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AppRoutingModule,
        CoreModule,
        MainModule
    ],
    providers: [
        //{ provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
        {
            // overwrite XHRBackend with custom interceptor
            // to catch Authorization header form JWT
            provide: XHRBackend,
            useClass: InterceptorXHRBackend
        },
        PackageGraphQLService,
        FieldGraphQLService,
        CoreService,
        ConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: ConfigLoader,
            deps: [ConfigService],
            multi: true
        }
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }
