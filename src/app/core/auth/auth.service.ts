import { Injectable, Injector } from '@angular/core';
import { CoreService } from './../../core/super/core.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './../../modules/admin/admin.models';

@Injectable()
export class AuthService extends CoreService {

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    constructor(
        protected injector: Injector,
        private jwtHelperService: JwtHelperService
    ) {
        super(injector);
        this.setEndpoint('/api/v1/login'); // set api URL
    }

    login(user: User) {
        // send credentials to server
        return this.http
            .post(this.getEndpoint('login'), {
                    user: user.user,
                    password: user.password
                }, this.options);
    }

    logout() {
        localStorage.removeItem('access_token');
    }

    // check if user is logged
    loggedIn() {
        const token: string = this.jwtHelperService.tokenGetter();

        if (! token) return false;

        const tokenExpired: boolean = this.jwtHelperService.isTokenExpired(token);

        return ! tokenExpired;
    }

    // get the user
    user() {
        return <User>this.jwtHelperService.decodeToken(localStorage.getItem('access_token'));
    }
}
