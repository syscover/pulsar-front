import { Component, Inject, forwardRef } from '@angular/core';

@Component({
    selector: 'ps-footer',
    template: `
        <div class="footer">
            <div class="card clearfix">
                <span class="footer-text-left">PrimeNG ULTIMA for Angular 2</span>
                <span class="footer-text-right"><span class="ui-icon ui-icon-copyright"></span>  <span>All Rights Reserved</span></span>
            </div>
        </div>
    `
})
export class FooterComponent {

}