import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../shared/super/core-list.component';
import { AttachmentMimeGraphQLService } from './attachment-mime-graphql.service';

@Component({
    selector: 'ps-attachment-mime-list',
    templateUrl: './attachment-mime-list.component.html'
})
export class AttachmentMimeListComponent extends CoreListComponent {

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'id', 'name', 'mime'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: AttachmentMimeGraphQLService
    ) {
        super(injector, graphQL);
    }
}
