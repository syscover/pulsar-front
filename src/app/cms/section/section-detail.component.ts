import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { SectionGraphQLService } from './section-graphql.service';
import { SelectItem } from 'primeng/primeng';

import * as _ from 'lodash';

@Component({
    selector: 'ps-section-detail',
    templateUrl: './section-detail.component.html'
})
export class SectionDetailComponent extends CoreDetailComponent {

    families: SelectItem[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: SectionGraphQLService
    ) {
        super(injector, graphQL);
    }

    ngOnInit() {

        // get field groups
        /*this.familyService.getRecords()
            .subscribe((response) => {

                this.families = _.map(<Family[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                });
                this.families.unshift({ label: 'Select a family', value: '' });

            });*/
        this.init();
    }

    createForm() {
        this.fg = this.fb.group({
            id: ['', [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(30)]
            ],
            name: ['', Validators.required ],
            article_family_id: ''
        });
    }
}
