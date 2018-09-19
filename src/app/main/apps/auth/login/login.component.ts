import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { environment } from 'environments/environment';
import { ValidationMessageService } from './../../../core/services/validation-message.service';
import { AuthenticationService } from './../../../core/services/authentication.service';
import './../../../core/functions/array-random.function';

@Component({
    selector   : 'dh2-login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.scss'],
    animations : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit
{
    loginError = false;
    loginForm: FormGroup;
    loginFormErrors: any;
    loadingButton = false;
    welcomeIntroduction = [
        'AUTH.WELCOME_INTRODUCTION_01',
        'AUTH.WELCOME_INTRODUCTION_02',
        'AUTH.WELCOME_INTRODUCTION_03',
        'AUTH.WELCOME_INTRODUCTION_04',
        'AUTH.WELCOME_INTRODUCTION_05',
        'AUTH.WELCOME_INTRODUCTION_06',
        'AUTH.WELCOME_INTRODUCTION_07',
        'AUTH.WELCOME_INTRODUCTION_08'
    ];
    welcomeMessage;

    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private validationMessageService: ValidationMessageService
    )
    {
        this.fuseConfig.setConfig({
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                }
            }
        });

        this.loginFormErrors = {
            user    : {},
            password: {}
        };

        this.welcomeMessage = this.welcomeIntroduction.random();
    }

    ngOnInit(): void
    {
        const remenberme = localStorage.getItem('remember_me') ? JSON.parse(localStorage.getItem('remember_me')) : null;

        this.loginForm = this.formBuilder.group({
            user        : [remenberme && remenberme.user ? remenberme.user : null, [Validators.required, Validators.email]],
            password    : [remenberme && remenberme.password ? remenberme.password : null, Validators.required],
            remember_me : false
        });

        this.validationMessageService.subscribeForm(this.loginForm, this.loginFormErrors);
    }

    login(): void
    {
        this.loadingButton = true;
        this.loginError = false;

        this.authenticationService
            .login(this.loginForm.value)
            .subscribe(response => {

                if (environment.debug) console.log('DEBUG - response after login: ', response);

                // set token
                localStorage.setItem('access_token', response['access_token']);

                // set logged user
                localStorage.setItem('user_logged',  btoa(JSON.stringify(response['user'])));

                // remenber me function
                if (this.loginForm.value.remember_me)
                {
                    localStorage.setItem('remember_me', JSON.stringify({
                        user: this.loginForm.value.user,
                        password: this.loginForm.value.password,
                    }));
                }
                
                // redirect to admin or retrieve the url you wanted to go
                if (this.authenticationService.redirectUrl) 
                {
                    this.router.navigate([this.authenticationService.redirectUrl]);
                } 
                else 
                {
                    this.router.navigate(['/apps/dashboard']);
                }
            }, (error) => {
                this.loadingButton = false;
                this.loginError = true;
            });
    }
}

