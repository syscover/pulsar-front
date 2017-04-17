import { Component } from '@angular/core';

@Component({
  selector: 'ps-error',
  templateUrl: './error.component.html',
  styles: [`
    :host {
        display: block;
        width: 100%;
        height: 100%;
    }
  `]
})
export class ErrorComponent {

  constructor() { }

}
