import { NgModule, Optional, SkipSelf, APP_INITIALIZER } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {AgmCoreModule, MapsAPILoader} from '@agm/core';
import { JwtModule } from '@auth0/angular-jwt';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { ApolloService } from './services/apollo.service';
import { ConfigService } from './services/config.service';
import { HttpService } from './services/http.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthorizationService } from './services/authorization.service';
import { BootstrapService } from './services/bootstrap.service';
import { NavigationService } from './services/navigation.service';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { HttpSynchronousService } from './services/http-synchronous.service';
import { ValidationMessageService } from './services/validation-message.service';
import {GoogleMapsLoaderService} from './services/google-maps-loader.service';

@NgModule({
    declarations: [],
    providers: [
        ApolloService,
        AuthenticationService,
        AuthorizationService,
        ConfigService,
        HttpService,
        HttpSynchronousService,
        NavigationService,
        ValidationMessageService,
        BootstrapService,
        {
            provide: MapsAPILoader,
            useClass: GoogleMapsLoaderService
        },
        {
            provide: APP_INITIALIZER,
            useFactory: BootstrapLoader,
            deps: [BootstrapService],
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true
        }
    ],
    imports: [
        HttpLinkModule,
        ApolloModule,
        AgmCoreModule.forRoot({
            libraries: ['places']
        }),
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: new Array(new RegExp('^null$'))
                // https://github.com/auth0/angular2-jwt/issues/504
                // whitelistedDomains:  [/^null$/]
                // whitelistedDomains: [/.*/]
            }
        })
    ],
    exports: []
})
export class CoreModule
{ 
    constructor(
        @Optional() @SkipSelf() parentModule: CoreModule
    ) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}

export function tokenGetter() 
{
    return localStorage.getItem('access_token');
}

export function BootstrapLoader(bootstrapService: BootstrapService) 
{
    return () => bootstrapService.load();
}
