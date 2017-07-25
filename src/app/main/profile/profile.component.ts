import { Component, OnInit, trigger, state, transition, style, animate } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../admin/admin.models';
import { JwtHelper } from 'angular2-jwt';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'ps-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
        trigger('menu', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class ProfileComponent implements OnInit {

    active: boolean;
    user: User;
    jwthelper: JwtHelper = new JwtHelper();

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() {
        // profile is the compenent in cherge of control that user is logged
        if (! this.authService.loggedIn()) {
            this.router.navigate(['/pulsar/login']);
        } else {
            this.user = this.authService.user();
        }
    }

    onClick(event) {
        this.active = !this.active;
        event.preventDefault();
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/pulsar/login']);
    }
}
