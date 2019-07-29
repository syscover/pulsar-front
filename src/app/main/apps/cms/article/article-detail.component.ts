import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '@horus/foundations/core-detail-component';
import { AuthenticationService } from '@horus/services/authentication.service';
import { Section, Family, Article, Category, Status } from '../cms.models';
import { AttachmentFamily } from '../../admin/admin.models';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Chips, ChipsDecoratorInterface } from '@horus/decorators/chips.decortor';
import '@horus/functions/date-to-json.function';
import * as _ from 'lodash';
import { graphQL } from './article.graphql';

@Chips()
@Component({
    selector: 'dh2-article-detail',
    templateUrl: './article-detail.component.html',
    animations: fuseAnimations,
    styleUrls: ['../../../../scss/improvements/perfect-scroll-bar.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ArticleDetailComponent extends CoreDetailComponent implements ChipsDecoratorInterface
{
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
    section: Section;
    family: Family; // family for adapt article form
    separatorKeysCodes = [ENTER, COMMA];
    loadingSlug = false;
    private _attachmentFamilies: AttachmentFamily[];
    
    constructor(
        protected injector: Injector,
        private _authenticationService: AuthenticationService
    )
    {
        super(injector, graphQL);
    }

    addTag: (formGroup: FormGroup, name: string, event: MatChipInputEvent) => void;
    removeTag: (formGroup: FormGroup, name: string, tag) => void;

    createForm(): void
    {
        this.fg = this.fb.group({
            ix: '',
            id: [{value: '', disabled: true}],
            lang_id: ['', Validators.required],
            name: ['', Validators.required],
            parent_id: '',
            author_id: '',
            author_name: [{value: '', disabled: true}],
            section_id: ['', Validators.required],
            family_id: '',
            field_group_id: '',
            status_id: ['', Validators.required],
            publish: '',
            date: '',
            title: '',
            categories_id: [],
            slug: '',
            link: '',
            blank: false,
            sort: '',
            tags: [],
            excerpt: '',
            article: '',
            attachments: this.fb.array([])
        });
    }
    
    beforePatchValueEdit(): void
    {
        // set section object and load attachment families
        this.section = _.find(this.sections, {id: this.object.section_id});
        this.loadAttachmentFamilies();

        // set family object, to change morphology of form
        this.family = _.find(this.families, {id: this.object.family_id});
    }

    afterPatchValueEdit(): void
    {    
        this.family = _.find(this.families, {id: this.object.family_id});

        // set field_group_id value
        if (this.family.field_group_id) this.fg.controls['field_group_id'].setValue(this.family.field_group_id);

        // TODO establece author cuando tengamos los usuarios relacionados
        // set tags extracting name field
        // this.fg.controls['author_name'].setValue(this.object.author.name + ' ' + this.object.author.surname);
    }

    handleChangeSection($event): void
    {
        if ($event.value) 
        {
            this.section = <Section>_.find(this.sections, {id: $event.value});

            // load families from section
            this.loadAttachmentFamilies();

            // TODO, trigger event instead call function
            if (this.section.family) 
            {
                this.handleChangeFamily({value: this.section.family.id});
            }
        }
    }

    private loadAttachmentFamilies(): void
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

    handleChangeFamily($event): void
    {
        if ($event.value) 
        {
            this.family = <Family>_.find(this.families, {id: $event.value});
            this.fg.controls['family_id'].setValue(this.family.id);

            // set field_group_id value
            if (this.family.field_group_id) this.fg.controls['field_group_id'].setValue(this.family.field_group_id);
        }
        else
        {
            this.family = null;
        }
    }

    handleCheckingSlug($event): void
    {
        this.loadingSlug = $event;
    }

    argumentsRelationsObject(): object
    {
        const sqlArticle = [
            {
                command: 'where',
                column: 'cms_article.lang_id',
                operator: '=',
                value: this.params['lang_id'] ? this.params['lang_id'] : this.baseLang.id
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
                value: this.params['lang_id'] ? this.params['lang_id'] : this.baseLang.id
            }
        ];

        const configStatuses = {
            key: 'pulsar-cms.statuses',
            lang: this.baseLang.id,
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

    setRelationsData(data: any): void
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
        const user = this._authenticationService.user();
        this.fg.patchValue({
            author_id: user.id,
            author_name: user.name + ' ' + user.surname
        });
    }
}
