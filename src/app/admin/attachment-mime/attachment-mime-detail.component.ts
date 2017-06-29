import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { AttachmentMimeGraphQLService } from './attachment-mime-graphql.service';
import { SelectItem } from 'primeng/primeng';
import * as _ from 'lodash';

@Component({
    selector: 'ps-attachment-mime-detail',
    templateUrl: './attachment-mime-detail.component.html'
})
export class AttachmentMimeDetailComponent extends CoreDetailComponent {

    resources: SelectItem[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: AttachmentMimeGraphQLService
    ) {
        super(injector, graphQL);
    }

    ngOnInit() {
        /*this.resourceService.getRecords()
            .subscribe((response) => {
                this.resources = _.map(<Resource[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                }); // get resources

                this.resources.unshift({ label: 'Select a resource', value: '' });
            });*/
        super.init();
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            resource_id: ['', Validators.required ],
            mime: ['', Validators.required ]
        });
    }
}
