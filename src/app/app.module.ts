import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouteReuseStrategy } from '@angular/router';

import { CustomReuseStrategy } from './shared/router/custom-reuse-srtrategy';

import { ConfigLoader } from './core/services/config.loader';
import { ConfigService } from './core/services/config.service';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        CoreModule
    ],
    providers: [
        //{ provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
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
