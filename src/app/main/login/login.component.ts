import { Component, Renderer2, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { environment } from './../../../environments/environment';
import { User } from './../../admin/admin.models';
import { ConfigService } from '../../core/services/config/config.service';
import { AuthService } from './../../core/auth/auth.service';

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
        private renderer: Renderer2,
        private router: Router,
        private configService: ConfigService,
        private authService: AuthService
    ) {
        this.createForm();
    }

    ngOnInit() {
        this.renderer.setStyle(document.body, 'background-image', `url(assets/layout/images/login/bg0${Math.floor((Math.random() * 10))}.jpg)`);
        //this.renderer.setStyle(document.body, 'height', 0);
    }

    ngOnDestroy() {
        this.renderer.removeStyle(document.body, 'background-image');
    }

    postRecord() {
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
                    this.router.navigate([`/${this.configService.get('appPrefix')}/admin`]);
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
