import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ps-progress-spinner',
    styleUrls: ['./progress-spinner.scss'],
    template: `
        <svg    class="spinner" 
                [attr.width]="width" 
                [attr.height]="height" 
                viewBox="0 0 66 66" 
                xmlns="http://www.w3.org/2000/svg">
            <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
        </svg>
    `
})

export class ProgressSpinnerComponent implements OnInit {

    @Input() private width = '30px';
    @Input() private height = '30px';

    constructor() { }

    ngOnInit() { }
}
