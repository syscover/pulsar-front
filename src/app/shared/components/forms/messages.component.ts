import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'primeng/primeng';

@Component({
    selector: 'ps-messages',
    styles: [``],
    template: `
        <p-messages [(value)]="value"></p-messages>
    `
})

export class MessagesComponent implements OnInit {

    @Input() value: Message[] = [];

    constructor() { }

    ngOnInit() { }
}
