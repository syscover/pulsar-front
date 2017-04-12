import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'ps-input',
    template: `
        <div [formGroup]="form">
            <div class="{{ className }}">
                <span class="md-inputfield">
                    <input  [formControlName]="name"
                            type="{{ type }}" 
                            pInputText>
                    <label>{{ label }}</label>
                    <div *ngIf="error" class="ui-message ui-messages-error ui-corner-all">
                        {{ error }}
                    </div>
                </span>
            <div>
        <div>
    `,
    styles: [`
        :host{
            display: block; 
            width: 100%;
            margin-bottom: 12px;
        }
        .ui-messages-error {
            position: absolute;
        }
        input.ng-dirty.ng-invalid {
            border-bottom-color: #e62a10; 
        }`]
})
export class InputComponent {

    @Input() private form: FormGroup;
    @Input() private error: string;
    @Input() private type: string = 'text';
    @Input() private label: string;
    @Input() private className: string;
    @Input() private name: string;

}
