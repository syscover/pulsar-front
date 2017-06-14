import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SelectItem } from 'primeng/primeng';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { ArticleService } from './article.service';
import { FamilyService } from '../family/family.service';
import { SectionService } from '../section/section.service';
import { Section, Family } from './../cms.models';

import * as _ from 'lodash';

@Component({
    selector: 'ps-article-detail',
    templateUrl: './article-detail.component.html'
})
export class ArticleDetailComponent extends CoreDetailComponent implements OnInit {

    sections: SelectItem[] = [];
    families: SelectItem[] = [];
    statuses: SelectItem[] = [];

    constructor(
        protected injector: Injector,
        protected objectService: ArticleService,
        private sectionService: SectionService,
        private familyService: FamilyService
    ) {
        super(injector, objectService);
    }

    ngOnInit() {

        this.sectionService
            .getRecords()
            .flatMap((response) => {
                this.sections = _.map(<Section[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                });
                this.sections.unshift({ label: 'Select a section', value: '' });

                return this.familyService.getRecords(); // return next observable
            }).flatMap(response => {
                this.families = _.map(<Family[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                });
                this.families.unshift({ label: 'Select a family', value: '' });

                return this.configService.getValue({
                    key: 'pulsar.cms.statuses',
                    translate: {
                        lang: this.baseLang,
                        property: 'name'
                    }
                }); // return next observable
            }).subscribe(response => {
                this.statuses = _.map(<Family[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                });
                this.statuses.unshift({ label: 'Select a status', value: '' });

                super.init();
            });
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}, Validators.required ],
            lang_id: ['', Validators.required],
            parent_article_id: '',
            author_id: '',
            author: [{value: '', disabled: true}],
            section_id: '',
            family_id: '',
            status_id: ['', Validators.required],
            publish: '',
            publish_text: '',
            date: '',
            title: ['', Validators.required ],
            slug: ['', Validators.required ],
            link: '',
            blank: '',
            sort: null,
            article: '',
            attachments: this.fb.array([])
        });
    }
}
