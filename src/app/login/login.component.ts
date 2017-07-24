import { AuthGuard } from '../core/auth/auth-guard.service';
import { Component, HostBinding } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { environment } from './../../environments/environment';
import { User } from './../admin/admin.models';
import { ConfigService } from '../core/services/config/config.service';
import { AuthService } from './../core/auth/auth.service';

@Component({
    selector: 'ps-login',
    templateUrl: './login.component.html'
})

export class LoginComponent {

    /*@HostBinding('@fadeInAnimation') get fadeInAnimation(){
        return 'true';
    };*/
    fg: FormGroup;
    email: string;
    password: string;
    jwtHelper: JwtHelper;
    user: User = new User();

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private configService: ConfigService,
        private authService: AuthService,
        private authGuard: AuthGuard
    ) {
        this.createForm();
    }

    onSubmit() {
        let auth$ = this.authService
            .login(this.fg.value)
            .subscribe(response => {

                if (environment.debug) console.log('DEBUG - response after login: ', response);

                localStorage.setItem('token', response.token);
                auth$.unsubscribe();

                // redirect to admin or retrieve the url you wanted to go
                if (this.authService.redirectUrl) {
                    this.router.navigate([this.authService.redirectUrl]);
                } else {
                    this.router.navigate([`/${this.configService.appPrefix}/admin`]);
                }
            });
    }

    createForm() {
        this.fg = this.fb.group({
            user: ['', Validators.required ],
            password: ['', Validators.required ]
        });
    }
}
