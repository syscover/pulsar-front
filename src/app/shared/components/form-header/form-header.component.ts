import { Component, Input } from '@angular/core';

@Component({
    selector: 'ps-form-header',
    styles: [`
        :host {
            display: block;
            width: 100%;
            height: 100%;
        }
        .form-header{
            position:relative;
            margin-bottom: 30px;
            padding-left: 15px;
            padding-top: 10px;
            padding-bottom: 10px;
            font-size: 1.2em; 
        }
        p {
            line-height: 25px; 
            margin: 0; 
        }
        i {
            position: absolute; 
            top:10px; 
            left:10px;
        }
        i + p {
            padding-left:30px;
        }
    `],
    template: `
        <div class="row ui-widget-header form-header">
            <span>
                <i *ngIf="icon" class="{{ icon }}"></i>
                <p>{{ title }}</p>
            </span>
        </div>
    `,
})
export class FormHeaderComponent {

    @Input() private title: string;
    @Input() private icon: string;

    constructor() { }

}
