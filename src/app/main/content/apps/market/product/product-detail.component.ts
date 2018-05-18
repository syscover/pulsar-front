import { Component, Injector, ViewChild, ViewEncapsulation } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { ProductGraphQLService } from './product-graphql.service';
import { AuthenticationService } from './../../../core/services/authentication.service';
import { DynamicFormService } from './../../../core/components/dynamic-form/dynamic-form.service';

import { User, Field, FieldValue, AttachmentFamily } from './../../admin/admin.models';
import { MatDatepicker } from '@angular/material';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import './../../../core/functions/date-to-json.function';
import { applyMixins } from './../../../core/functions/apply-mixins.function';
import { Chipable } from './../../../core/traits/chipable.trait';
import * as _ from 'lodash';

@Component({
    selector: 'dh2-product-detail',
    templateUrl: './product-detail.component.html',
    animations: fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/perfect-scroll-bar.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProductDetailComponent extends CoreDetailComponent implements Chipable
{
    @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;
    objectTranslation = 'CMS.ARTICLE';
    objectTranslationGender = 'M';
    
    tags: String[] = [];
    
    attachmentFamilies: AttachmentFamily[] = [];
    imageStyles: Object = new Object;
    
    
    separatorKeysCodes = [ENTER, COMMA];
    private _attachmentFamilies: AttachmentFamily[];
    
    constructor(
        protected injector: Injector,
        protected graphQL: ProductGraphQLService,
        private authenticationService: AuthenticationService
    ) {
        super(injector, graphQL);
    }
    
    addTag: (formGroup: FormGroup, name: string, event: MatChipInputEvent) => void;
    removeTag: (formGroup: FormGroup, name: string, tag) => void;
    createForm() {
        this.fg = this.fb.group({
            ix: null,
            id: [{value: null, disabled: true}],
            lang_id: [null, Validators.required],
            name: [null, Validators.required],
            parent_id: null,
            author_id: null,
            author_name: [{value: null, disabled: true}],
            section_id: [null, Validators.required],
            family_id: null,
            field_group_id: null,
            status_id: [null, Validators.required],
            publish: null,
            date: null,
            title: null,
            categories_id: [],
            slug: null,
            link: null,
            blank: null,
            sort: null,
            tags: [],
            excerpt: null,
            article: null,
            attachments: this.fb.array([])
        });
    }

    
    

    

    

    

    argumentsRelationsObject(): Object
    {
        const sqlArticle = [
            {
                command: 'where',
                column: 'cms_article.lang_id',
                operator: '=',
                value: this.params['lang_id'] ? this.params['lang_id'] : this.baseLang
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'cms_article.name'
            }
        ];

        // set id of product if action is edit
        if (this.params['id']) {
            sqlArticle.push({
                command: 'where',
                column: 'cms_article.id',
                operator: '<>',
                value: this.params['id']
            });
        }

        const sqlSection = [
            {
                'command': 'orderBy',
                'operator': 'asc',
                'column': 'cms_section.name'
            }
        ];

        const sqlFamily = [
            {
                'command': 'orderBy',
                'operator': 'asc',
                'column': 'cms_family.name'
            }
        ];

        const sqlAttachmentFamily = [
            {
                'command': 'where',
                'column': 'admin_attachment_family.resource_id',
                'operator': '=',
                'value': 'cms-article'
            },
            {
                'command': 'orderBy',
                'operator': 'asc',
                'column': 'admin_attachment_family.name'
            }
        ];

        const sqlCategory = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: this.params['lang_id'] ? this.params['lang_id'] : this.baseLang
            }
        ];

        const configStatuses = {
            key: 'pulsar-cms.statuses',
            lang: this.baseLang,
            property: 'name'
        };

        return {
            sqlArticle,
            sqlSection,
            sqlFamily,
            sqlAttachmentFamily,
            sqlCategory,
            configStatuses
        };
    }

    setRelationsData(data: any) 
    {
        /* // cms sections
        this.sections = data.cmsSections;
        // cms families
        this.families = data.cmsFamilies;
        // cms articles
        this.articles = data.cmsArticles;
        // cms categories
        this.categories = data.cmsCategories;
        // cms statuses
        this.statuses = data.cmsStatuses;

        // admin attachment families
        // this objects are manage in loadAttachmentFamilies method
        this._attachmentFamilies = data.adminAttachmentFamilies;

        // cms author
        const user = this.authenticationService.user();
        this.fg.patchValue({
            author_id: user.id,
            author_name: user.name + ' ' + user.surname
        }); */
    }
}
// multiple inheritance
// applyMixins(ArticleDetailComponent, [Chipable]);
