import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { AttachmentFamilyGraphQLService } from './attachment-family-graphql.service';
import { SelectItem } from 'primeng/primeng';

import * as _ from 'lodash';

@Component({
    selector: 'ps-attachment-family-detail',
    templateUrl: './attachment-family-detail.component.html'
})
export class AttachmentFamilyDetailComponent extends CoreDetailComponent {

    resources: SelectItem[] = [];
    sizes: SelectItem[] = [];
    formats: SelectItem[] = [
        { label: 'Select a format image', value: '' },
        { value: 'jpg', label: 'jpg' },
        { value: 'png', label: 'png' },
        { value: 'gif', label: 'gif' },
        { value: 'tif', label: 'tif' },
        { value: 'bmp', label: 'bmp' },
        { value: 'data-url', label: 'data-url' }
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: AttachmentFamilyGraphQLService
    ) {
        super(injector, graphQL);
    }

    ngOnInit() {
        /*this.resourceService.getRecords()
            .flatMap((response) => {
                this.resources = _.map(<Resource[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                }); // get resources

                this.resources.unshift({ label: 'Select a resource', value: '' });

                return  this.configService.getValue({
                    key: 'pulsar.admin.sizes'
                });
            }).subscribe((response) => {
                this.sizes = _.map(<any[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                });

            });*/

            super.init();
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            resource_id: ['', Validators.required ],
            name: ['', Validators.required ],
            width: null,
            height: null,
            sizes: null,
            quality: null,
            format: ''
        });
    }
}
