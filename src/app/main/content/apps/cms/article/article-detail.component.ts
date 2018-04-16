import { Component, Injector, ViewChild, ViewEncapsulation } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { ArticleGraphQLService } from './article-graphql.service';
import { AuthenticationService } from './../../../core/services/authentication.service';
import { DynamicFormService } from './../../../core/components/dynamic-form/dynamic-form.service';
import { Section, Family, Article, Category, Status } from './../cms.models';
import { User, Field, FieldValue, AttachmentFamily } from './../../admin/admin.models';
import { MatDatepicker } from '@angular/material';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import './../../../core/functions/date-to-json.function';
import { applyMixins } from './../../../core/functions/apply-mixins.function';
import { Chipable } from './../../../core/traits/chipable.trait';
import * as _ from 'lodash';
// import { AttachmentFilesLibraryComponent } from './../../../shared/components/forms/attachment-files-library/attachment-files-library/attachment-files-library.component';
// import { AuthService } from './../../../core/auth/auth.service';
// import { ConfigService } from '../../../core/services/config.service';
// import gql from 'graphql-tag';

@Component({
    selector: 'dh2-article-detail',
    templateUrl: './article-detail.component.html',
    animations: fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/perfect-scroll-bar.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ArticleDetailComponent extends CoreDetailComponent implements Chipable
{
    @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;   
    objectTranslation = 'CMS.ARTICLE';
    objectTranslationGender = 'M';
    sections: Section[] = [];
    families: Family[] = [];
    statuses: Status[] = [];
    articles: Article[] = [];
    categories: Category[] = [];
    tags: String[] = [];
    object: Article = new Article();    
    attachmentFamilies: AttachmentFamily[] = [];
    imageStyles: Object = new Object;
    section: Section;
    family: Family; // family for adapt article form
    separatorKeysCodes = [ENTER, COMMA];
    private _attachmentFamilies: AttachmentFamily[];
    
    constructor(
        protected injector: Injector,
        protected graphQL: ArticleGraphQLService,
        private authenticationService: AuthenticationService,
        private dynamicFormService: DynamicFormService
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

    
    beforePatchValueEdit() 
    {
        // set section object and load attachment families
        this.section = _.find(this.sections, {id: this.object.section_id});
        this.loadAttachmentFamilies();

        // set family object, to change morphology of form
        this.family = _.find(this.families, {id: this.object.family_id});
    }

    afterPatchValueEdit() 
    {    
        this.family = _.find(this.families, {id: this.object.family_id});

        // TODO establece author cuando tengamos los usuarios relacionados
        // set tags extracting name field
        // this.fg.controls['author_name'].setValue(this.object.author.name + ' ' + this.object.author.surname);

        // manage custom fields
        this.handleGetCustomFields();
    }

    handleChangeSection($event) 
    {
        if ($event.value) 
        {
            this.section = _.find(this.sections, {id: $event.value});

            // load families from section
            this.loadAttachmentFamilies();

            // TODO, trigger event instead call function
            if (this.section.family) 
            {
                this.handleChangeFamily({value: this.section.family.id});
            }
        }
    }

    private loadAttachmentFamilies() 
    {
        // load attachment families depend of article section
        if (this.section.attachment_families) 
        {
            this.attachmentFamilies = [];
            for (const idAttachmentFamily of this.section.attachment_families)
            {
                const af = _.find(this._attachmentFamilies, {id: +idAttachmentFamily});
                this.attachmentFamilies.push(af);
            }
        } 
        else 
        {
            // reset attachment families
            this.attachmentFamilies = [];
        }
    }

    handleChangeFamily($event)
    {
        // reset custom fields
        // this.dynamicFormService.reset();

        if ($event.value) 
        {
            this.family = _.find(this.families, {id: $event.value});
            this.fg.controls['family_id'].setValue(this.family.id);
            
            // load custom field again
            this.handleGetCustomFields();
        }
        else
        {
            this.family = null;
        }
    }

    handleGetCustomFields() 
    {
        if (this.family.field_group_id) 
        {
            this.fg.controls['field_group_id'].setValue(this.family.field_group_id);
            
            // get properties for get values of custom fields
            // const customFields = this.object.data && this.object.data.customFields ? this.object.data.customFields : undefined;
            
            // load custom fields 
          // this.dynamicFormService.instance(this.fg, this.family.field_group_id, customFields);
        }
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
        // cms sections
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
        });
    }
}
// multiple inheritance
applyMixins(ArticleDetailComponent, [Chipable]);
