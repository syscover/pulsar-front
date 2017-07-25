import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Message } from 'primeng/primeng';
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

    fg: FormGroup;
    email: string;
    password: string;
    jwtHelper: JwtHelper;
    user: User = new User();
    msgs: Message[] = [];

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private configService: ConfigService,
        private authService: AuthService
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
            }, (error) => {
                console.log(error.status);
                this.msgs = [];
                this.msgs.push({severity: 'error', summary: 'Authentication error', detail: 'Your user or password is incorrect'});
            });
    }

    createForm() {
        this.fg = this.fb.group({
            user: ['', Validators.required ],
            password: ['', Validators.required ]
        });
    }
}
