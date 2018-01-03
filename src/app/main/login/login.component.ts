import { Component, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { User } from './../../modules/admin/admin.models';
import { ConfigService } from '../../core/services/config.service';
import { AuthService } from './../../core/auth/auth.service';

@Component({
    selector: 'ps-login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {

    fg: FormGroup;
    email: string;
    password: string;
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
    }

    ngOnDestroy() {
        this.renderer.removeStyle(document.body, 'background-image');
    }

    postRecord() {
        this.authService
            .login(this.fg.value)
            .subscribe(response => {

                if (environment.debug) console.log('DEBUG - response after login: ', response);

                localStorage.setItem('access_token', response['access_token']);

                // redirect to admin or retrieve the url you wanted to go
                if (this.authService.redirectUrl) {
                    this.router.navigate([this.authService.redirectUrl]);
                } else {
                    this.router.navigate([`/${this.configService.get('appPrefix')}/admin`]);
                }
            }, (error) => {
                console.log(error);
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
