import { Component, OnInit } from '@angular/core';
import * as Ps from 'perfect-scrollbar';

@Component({
    selector: 'ps-side-navbar',
    templateUrl: './side-navbar.component.html',
    styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {

    constructor() {
     }

    ngOnInit() {
        const el = document.querySelector('.custom-scrollbar');
        Ps.initialize(<HTMLElement>el);
        $('.button-collapse').sideNav();
        $('.collapsible').collapsible();
    }

}
