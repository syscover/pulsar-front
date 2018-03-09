import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FuseConfigService } from '../../../../../core/services/config.service';
import { fuseAnimations } from '../../../../../core/animations';
import { environment } from './../../../../../../environments/environment';
import { AuthenticationService } from './../../../core/services/authentication.service';

@Component({
    selector   : 'dh2-login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.scss'],
    animations : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;
    loginFormErrors: any;
    loading = false;

    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService
    )
    {
        this.fuseConfig.setSettings({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });

        this.loginFormErrors = {
            user    : {},
            password: {}
        };
    }

    ngOnInit()
    {
        this.loginForm = this.formBuilder.group({
            user    : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });
    }

    onLoginFormValuesChanged()
    {
        for (const field in this.loginFormErrors)
        {
            if (! this.loginFormErrors.hasOwnProperty(field))
            {
                continue;
            }

            // Clear previous errors
            this.loginFormErrors[field] = {};

            // Get the control
            const control = this.loginForm.get(field);

            if ( control && control.dirty && ! control.valid )
            {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }

    login() 
    {
        this.loading = true;

        this.authenticationService
            .login(this.loginForm.value)
            .subscribe(response => {

                if (environment.debug) console.log('DEBUG - response after login: ', response);

                localStorage.setItem('access_token', response['access_token']);

                // redirect to admin or retrieve the url you wanted to go
                if (this.authenticationService.redirectUrl) 
                {
                    this.router.navigate([this.authenticationService.redirectUrl]);
                } 
                else 
                {
                    this.router.navigate([`/`]);
                }
            }, (error) => {
                this.loading = false;
                console.log(error);
                // this.msgs = [];
                // this.msgs.push({severity: 'error', summary: 'Authentication error', detail: 'Your user or password is incorrect'});
            });
    }
}

