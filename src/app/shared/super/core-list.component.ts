import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { CoreService } from './core.service';

export class CoreListComponent {

    constructor(
        private parentService: CoreService
    ) { }

    getRecords(f: Function): void {
        this.parentService.getRecords().subscribe(data => f(data));
    }

    deleteRecord(f: Function, object: any): void {

        let lang: string;

        if (object.lang_id) {   // check if has languages
            lang = object.lang_id;
        }

        this.parentService
            .deleteRecord(object.id, lang)
            .subscribe(data => this.getRecords(f));
    }

}
