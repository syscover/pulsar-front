import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

@Component({
    selector: 'ps-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

    /*@HostBinding('@fadeInAnimation') get fadeInAnimation(){
        return 'true';
    };*/
    fg: FormGroup;
    email: string;
    password: string;
    jwtHelper: JwtHelper;

    constructor(
        public router: Router
    ) { }

    ngOnInit() {
    }

    login() {
    this.router.navigate(['/pulsar/admin']);
    }
}
