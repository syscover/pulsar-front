import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig(), http, options);
}

@NgModule({
    providers: [
        AuthService,
        AuthGuard,
        /**
         * register provide AuthHttp and define authHttpServiceFactory to can create object.
         * with AuthHttp attach one token to request http
         */
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, RequestOptions]
        }
    ]
})
export class AuthModule { }
