import { Component, Injector, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SelectItem } from 'primeng/primeng';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { ArticleGraphQLService } from './article-graphql.service';
import { DropdownComponent } from './../../shared/components/forms/dropdown.component';
import { AttachmentFilesLibraryComponent } from './../../shared/components/forms/attachment-files-library/attachment-files-library/attachment-files-library.component';
import { DynamicFormService } from './../../shared/components/forms/dynamic-form/dynamic-form.service';
import { AuthService } from './../../core/auth/auth.service';
import { User, FieldValue, AttachmentFamily } from './../../admin/admin.models';
import { Section, Family, Article, Category, Status } from './../cms.models';
import { Field } from './../../admin/admin.models';
import { ConfigService } from '../../core/services/config/config.service';
import { environment } from './../../../environments/environment';
import * as _ from 'lodash';
import gql from 'graphql-tag';

@Component({
    selector: 'ps-article-detail',
    templateUrl: './article-detail.component.html'
})
export class ArticleDetailComponent extends CoreDetailComponent {

    // set empty object
    object: Article = new Article();

    sections: SelectItem[] = [];
    families: SelectItem[] = [];
    statuses: SelectItem[] = [];
    articles: SelectItem[] = [];
    categories: SelectItem[] = [];
    attachmentFamilies: AttachmentFamily[] = [];
    imageStyles: Object = new Object;
    user: User = new User();
    section: Section;
    family: Family;
    imageUploadURL: string;

    private _sections: Section[];
    private _families: Family[];
    private _attachment_families: AttachmentFamily[];

    // custom fields
    fields: Field[];
    fieldValues: FieldValue[];

    @ViewChild('attachments') private attachments: AttachmentFilesLibraryComponent;
    @ViewChild('familiesInput') private familiesInput: DropdownComponent;

    constructor(
        protected injector: Injector,
        protected graphQL: ArticleGraphQLService,
        protected authService: AuthService,
        private dynamicFormService: DynamicFormService,
        public configService: ConfigService
    ) {
        super(injector, graphQL);

        // set froala upload image url
        this.imageUploadURL = `${this.apiUrl}/api/v1/admin/wysiwyg/upload`;
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}, Validators.required ],
            lang_id: ['', Validators.required],
            name: ['', Validators.required],
            parent_article_id: '',
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
            blank: '',
            sort: null,
            tags: [],
            excerpt: '',
            article: '',
            attachments: this.fb.array([])
        });
    }

    handleChangeSection($event) {
        // change family if, change section
        if ($event.value) {
            this.section = _.find(this._sections, {id: $event.value});

            this.loadAttachmentFamilies();

            // TODO, trigger event instead call function
            if (this.section.family) {
                this.handleChangeFamily({value: this.section.family.id});
            }
        }
    }

    private loadAttachmentFamilies() {
        // load attachment families depend of article familie
        if (this.section.attachment_families !== null) {
            this.attachmentFamilies = [];
            for (let idAttachmentFamily of this.section.attachment_families) {
                this.attachmentFamilies.push(_.find(this._attachment_families, {id: +idAttachmentFamily}));
            }
        } else {
            this.attachmentFamilies = this._attachment_families;
        }
    }

    handleChangeFamily($event) {
        this.fieldValues = [];
        this.fields = [];

        if ($event.value) {
            // set family object, to change morphology of form
            this.family = _.find(this._families, {id: $event.value});

            this.fg.controls['family_id'].setValue(this.family.id);

            this.handleGetCustomFields();
        }
    }

    // get custom fields that has this object
    handleGetCustomFields() {
        if (this.family.field_group_id) {
            this.fg.controls['field_group_id'].setValue(this.family.field_group_id);

            // get properties for get values of custom fields
            let customFields = this.object.data && this.object.data.customFields ? this.object.data.customFields : undefined;

            this.dynamicFormService.instance(
                this.family.field_group_id,
                this.fg,
                customFields,
                (fields) => {
                    this.fields = fields;
                });
        }
    }

    setData(response = undefined) {
        if (this.dataRoute.action === 'edit' || this.dataRoute.action === 'create-lang') {
            this.object = response; // function to set custom data

            // set section object and load attachment families
            this.section = _.find(this._sections, {id: this.object.section_id});
            this.loadAttachmentFamilies();

            // set family object, to change morphology of form
            this.family = _.find(this._families, {id: this.object.family_id});

            // create copy object for change readonly properties
            let objectInput = Object.assign({}, this.object);

            // change publish and date format to Date, for calendar component
            objectInput['publish'] = new Date(this.object.publish);
            if (this.object.date) {
                objectInput['date'] = new Date(this.object.date);
            }

            // set values of form, if the object not match with form, use pachValue instead of setValue
            this.fg.patchValue(objectInput);

            // set categories extracting ids
            this.fg.controls['categories_id'].setValue(_.map(this.object.categories, 'id'));

            // set tags extracting name field
            this.fg.controls['tags'].setValue(_.map(this.object.tags, 'name'));

            // TODO establece author cuando tengamos los usuarios relacionados
            // set tags extracting name field
            // this.fg.controls['author_name'].setValue(this.object.author.name + ' ' + this.object.author.surname);

            // manage custom fields
            this.handleGetCustomFields();

            if (this.dataRoute.action === 'create-lang') {
                this.fg.patchValue({
                    // set lang id in form from object with multiple language
                    lang_id: this.lang.id
                });
            }
        }
    }

    getCustomArgumentsPostRecord(args: Object, object: any) {
        // serialeize Date object to don't be changed by apollo client
        args['object']['publish'] = args['object']['publish'].toString();
        if (args['object']['date']) {
            args['object']['date'] = args['object']['date'].toString();
        }

        return args;
    }

    argumentsRelationsObject(): Object {
        let sqlArticle = [
            {
                command: 'where',
                column: 'cms_article.lang_id',
                operator: '=',
                value: this.params['lang'] ? this.params['lang'] : this.baseLang
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
        };

        let sqlAttachmentFamily = [
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

        let sqlCategory = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: this.params['lang'] ? this.params['lang'] : this.baseLang
            }
        ];

        let configStatuses = {
            key: 'pulsar-cms.statuses',
            lang: this.baseLang,
            property: 'name'
        };

        return {
            sqlArticle,
            sqlAttachmentFamily,
            sqlCategory,
            configStatuses
        };
    }

    setRelationsData(data) {
        // cms sections
        this._sections = data['cmsSections'];
        this.sections = _.map(this._sections, obj => {
            return { value: obj.id, label: obj.name };
        });
        this.sections.unshift({ label: 'Select a section', value: '' });

        // cms families
        this._families = data['cmsFamilies'];
        this.families = _.map(this._families, obj => {
            return { value: obj.id, label: obj.name };
        });
        this.families.unshift({ label: 'Select a family', value: '' });

        // cms categories
        this.categories = _.map(<Category[]>data['cmsCategories'], obj => {
            return { value: obj.id, label: obj.name };
        });

        // cms statuses
        this.statuses = _.map(<Status[]>data['cmsStatuses'], obj => {
            return { value: obj.id, label: obj.name };
        });
        this.statuses.unshift({ label: 'Select a status', value: '' });

        // admin attachment families
        this._attachment_families = <AttachmentFamily[]>data['adminAttachmentFamilies'];
        this.attachmentFamilies = this._attachment_families;

        // Images styles for Froala
        for (let attachemntFamily of this.attachmentFamilies) {
            this.imageStyles['ps-attachment-family-' + attachemntFamily.id] = attachemntFamily.name;
        }

        // cms author
        this.user = this.authService.user();
        this.fg.patchValue({
            author_id: this.user.id,
            author_name: this.user.name + ' ' + this.user.surname
        });

        // cms articles
        this.articles = _.map(<Article[]>data['cmsArticles'], obj => {
            return { value: obj.id, label: obj.name };
        });
        this.articles.unshift({ label: 'Select a article', value: '' });
    }

    handleCheckSlug($event) {
        let subs = this.objectService
            .proxyGraphQL()
            .watchQuery({
                fetchPolicy: 'network-only',
                query: gql`
                    query MarketProductSlug ($model:String! $slug:String! $id:Int) {
                        adminCheckSlug (model:$model slug:$slug id:$id)
                    }
                `,
                variables: {
                    model: 'Syscover\\Cms\\Models\\Article',
                    slug: $event.target.value,
                    id: this.object.id
                }
            })
            .subscribe(({data}) => {

                if (environment.debug) console.log('DEBUG - response of query article slug: ', data);

                this.fg.controls['slug'].setValue(data['adminCheckSlug']);
                subs.unsubscribe();
            });
    }
}
