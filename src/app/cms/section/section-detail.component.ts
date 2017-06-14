import { FieldGroup } from './../../admin/admin.models';
import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/primeng';

import { Editor, Family } from './../cms.models';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { SectionService } from './section.service';
import { FamilyService } from './../family/family.service';

import * as _ from 'lodash';

@Component({
    selector: 'ps-section-detail',
    templateUrl: './section-detail.component.html'
})
export class SectionDetailComponent extends CoreDetailComponent implements OnInit {

    families: SelectItem[] = [];

    constructor(
        protected injector: Injector,
        protected objectService: SectionService,
        protected familyService: FamilyService
    ) {
        super(injector, objectService);
    }

    ngOnInit() {

        // get field groups
        this.familyService.getRecords()
            .subscribe((response) => {

                this.families = _.map(<Family[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                });

                this.families.unshift({ label: 'Select a family', value: '' });
            });

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
