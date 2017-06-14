import { Injectable, Injector } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import { CoreService } from './../../shared/super/core.service';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';

import { User } from './../../admin/admin.models';

@Injectable()
export class AuthService extends CoreService {

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    constructor(
        protected injector: Injector
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
                }, this.options)
            .map((response: Response) => response.json());
    }

    loggedIn() {
        return tokenNotExpired();
    }
}
