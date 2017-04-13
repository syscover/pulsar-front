import { Component, OnInit, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'ps-datatable-header',
    templateUrl: './datatable-header.component.html'
})
export class DatatableHeaderComponent implements OnInit {

    @Input() title: string;
    @Input() createLink: string;

    constructor() { }

    ngOnInit() {
    }

}
