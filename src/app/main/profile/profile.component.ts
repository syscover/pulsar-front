import { Component, OnInit, trigger, state, transition, style, animate } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../modules/admin/admin.models';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../core/auth/auth.service';
import { Apollo } from 'apollo-angular';

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

    constructor(
        private router: Router,
        private authService: AuthService,
        private jwtHelper: JwtHelperService,
        private apollo: Apollo
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
        this.apollo.getClient().resetStore();
        this.router.navigate(['/pulsar/login']);
    }
}
