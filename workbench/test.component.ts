import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

@Component({
    selector: 'ps-test',
    template: `
        <strong>
            <ng-content></ng-content>
        </strong>
    `,
    styles: [`
        :host{
            margin-bottom: 40px;
        }
        `]
})
export class TestComponent implements OnInit {

    constructor() { }

    ngOnInit() {

    }

}
