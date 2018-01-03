import { Input } from '@angular/core/src/metadata/directives';
import { Component } from '@angular/core';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'ps-data-container',
  templateUrl: './data-container.component.html',
  styles: [`
    :host {
        display: block;
        width: 100%;
        height: 100%;
    }
  `]
})
export class DataContainerComponent {

    //msgs: Message[] = [];

    constructor() { }
}
