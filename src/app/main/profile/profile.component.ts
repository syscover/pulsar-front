import {Component, Input, OnInit, EventEmitter,
        ViewChild, trigger, state, transition,
        style, animate, Inject, forwardRef} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/primeng';
import { User } from '../../admin/admin.models';
import { JwtHelper } from 'angular2-jwt';

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

    ngOnInit() {
        this.user = this.jwthelper.decodeToken(localStorage.getItem('token'));
        console.log(this.user);
    }

    onClick(event) {
        this.active = !this.active;
        event.preventDefault();
    }

}
