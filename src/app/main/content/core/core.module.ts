import { NgModule, Optional, SkipSelf, APP_INITIALIZER } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { ApolloService } from './services/apollo.service';
import { ConfigService } from './services/config.service';
import { HttpService } from './services/http.service';
import { BootstrapService } from './services/bootstrap.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthorizationService } from './services/authorization.service';
import { HttpInterceptorService } from './services/http-interceptor.service';

@NgModule({
    declarations: [],
    providers: [
        ConfigService,
        HttpService,
        ApolloService,
        AuthenticationService,
        AuthorizationService,
        BootstrapService,
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
        JwtModule.forRoot({
            jwtOptionsProvider: {
                provide: JWT_OPTIONS,
                useFactory: jwtOptionsFactory,
                deps: []
            }
        })
    ],
    exports: [
    ]
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

export function jwtOptionsFactory() {
    return {
        tokenGetter: () => {
            return localStorage.getItem('access_token');
        },
        whitelistedDomains: [/.*/]
    };
}

export function BootstrapLoader(bootstrapService: BootstrapService) 
{
    return () => bootstrapService.load();
}