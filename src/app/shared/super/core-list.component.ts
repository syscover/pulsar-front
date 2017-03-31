import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { CoreService } from './core.service';

export class CoreListComponent {

    constructor(
        private parentService: CoreService
    ) { }

    getRecords(f: Function): void {
        this.parentService.getRecords().subscribe(data => f(data));
    }

    deleteRecord(object: any, f: Function): void {
        this.parentService
            .deleteRecord(object.id)
            .subscribe(data => this.getRecords(f));
    }

}
