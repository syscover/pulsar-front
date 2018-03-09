import { Injectable, Injector } from '@angular/core';
import { HttpService } from './http.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './../../apps/admin/admin.models';

@Injectable()
export class AuthenticationService extends HttpService
{
    // store the URL so we can redirect after logging in
    redirectUrl: string;

    constructor(
        protected injector: Injector,
        private jwtHelperService: JwtHelperService
    ) {
        super(injector);
        this.setEndpoint('/api/v1/login'); // set api URL
    }

    login(user: User) 
    {
        // send credentials to server
        return this.httpClient
            .post(this.getEndpoint('login'), {
                    user: user.user,
                    password: user.password
                }, this.options);
    }

    logout() 
    {
        localStorage.removeItem('access_token');
    }

    check() 
    {
        const token: string = this.jwtHelperService.tokenGetter();
        if (! token) 
        {
            return false;
        }
        const tokenExpired: boolean = this.jwtHelperService.isTokenExpired(token);
        return ! tokenExpired;
    }

    user() 
    {
        return <User>this
            .jwtHelperService
            .decodeToken(localStorage.getItem('access_token'));
    }
}
