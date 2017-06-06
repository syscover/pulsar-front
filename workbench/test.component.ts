import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

@Component({
    selector: 'ps-test',
    template: `
        <strong>
            <ng-content></ng-content>
        </strong>

        <ps-autocomplete    [form]="fg"
                            [errors]="formErrors"
                            key="id"
                            field="name"
                            placeholder="Search a country"
                            [options]="countries"
                            name="country_id"
                            class="col-sm-12 col-md-5">
        </ps-autocomplete>
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
