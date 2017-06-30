import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SelectItem } from 'primeng/primeng';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { ArticleGraphQLService } from './article-graphql.service';
import { DropdownComponent } from './../../shared/components/forms/dropdown.component';
import { AttachmentFilesLibraryComponent } from './../../shared/components/forms/attachment-files-library/attachment-files-library/attachment-files-library.component';
import { DynamicFormService } from './../../shared/components/forms/dynamic-form/dynamic-form.service';
import { User, FieldValue, AttachmentFamily } from './../../admin/admin.models';
import { Section, Family, Article, Category, Status } from './../cms.models';
import { Field } from './../../admin/admin.models';

import * as _ from 'lodash';

@Component({
    selector: 'ps-article-detail',
    templateUrl: './article-detail.component.html'
})
export class ArticleDetailComponent extends CoreDetailComponent implements OnInit {

    sections: SelectItem[] = [];
    families: SelectItem[] = [];
    statuses: SelectItem[] = [];
    articles: SelectItem[] = [];
    categories: SelectItem[] = [];
    attachmentFamilies: AttachmentFamily[] = [];
    user: User = new User();

    private _sections: Section[];
    private _families: Family[];

    // custom fields
    fields: Field[];
    fieldValues: FieldValue[];

    @ViewChild('attachments') private attachments: AttachmentFilesLibraryComponent;
    @ViewChild('familiesInput') private familiesInput: DropdownComponent;

    // paramenters for parent class
    object: Article = new Article(); // set empty object
    customCallback: Function = (response = undefined) => {
        if (this.dataRoute.action === 'edit' || this.dataRoute.action === 'create-lang') {
            this.object = response.data; // function to set custom data
            // change publish and date format to Date, for calendar component
            this.object.publish = new Date(this.object.publish);
            if (this.object.date) {
              this.object.date = new Date(this.object.date);
            }
            // set values of form, if the object not match with form, use pachValue instead of setValue
            this.fg.patchValue(this.object);

            // set attachments in FormArray from ps-attachment-files-library component
            this.attachments.setValue(this.object.attachments);

            // categories
            this.fg.controls['categories_id'].setValue(_.map(this.object.categories, 'id')); // set categories extracting ids
            // set tags
            this.fg.controls['tags'].setValue(_.map(this.object.tags, 'name')); // set tags extracting name field
            // set tags extracting name field
            this.fg.controls['author_name'].setValue(this.object.author.name + ' ' + this.object.author.surname);

            //this.handleGetCustomFields();

            if (this.dataRoute.action === 'create-lang') {
                this.fg.patchValue({
                    // set lang id in form from object with multiple language
                    lang_id: this.lang.id
                });
            }
        }
    }

    constructor(
        protected injector: Injector,
        protected graphQL: ArticleGraphQLService,
        private dynamicFormService: DynamicFormService
    ) {
        super(injector, graphQL);
    }

    ngOnInit() {

                                                        /*this.sectionService
                                                            .getRecords()
                                                            .flatMap((response) => {
                                                                        this._sections = response.data;
                                                                        this.sections = _.map(this._sections, obj => {
                                                                            return { value: obj.id, label: obj.name };
                                                                        });
                                                                        this.sections.unshift({ label: 'Select a section', value: '' });

                                                                        return this.familyService.getRecords(); // return next observable
                                                                    }).flatMap(response => {
                                                                        this._families = response.data;
                                                                        this.families = _.map(this._families, obj => {
                                                                            return { value: obj.id, label: obj.name };
                                                                        });
                                                                        this.families.unshift({ label: 'Select a family', value: '' });

                // load articles to select a parent
                let query = {
                    type: 'query',
                    parameters: [
                        {
                            command: 'where',
                            column: 'article.lang_id',
                            operator: '=',
                            value: this.params['lang'] ? this.params['lang'] : this.baseLang
                        },
                        {
                            command: 'orderBy',
                            operator: 'asc',
                            column: 'article.name'
                        }
                    ]
                };

                // set id of product if action is edit
                if (this.params['id']) {
                    query.parameters.push({
                        command: 'where',
                        column: 'article.id',
                        operator: '<>',
                        value: this.params['id']
                    });
                };

                return this.objectService.searchRecords(query); // return next observable
            }).flatMap(response => {
                // set articles dropdown
                this.articles = _.map(<Article[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                }); 
                this.articles.unshift({ label: 'Select a article', value: '' });

                                                                                        return this.categoryService.searchRecords({
                                                                                            type: 'query',
                                                                                            parameters: [
                                                                                                {
                                                                                                    command: 'where',
                                                                                                    column: 'article_category.lang_id',
                                                                                                    operator: '=',
                                                                                                    value: this.params['lang'] ? this.params['lang'] : this.baseLang
                                                                                                },
                                                                                                {
                                                                                                    command: 'orderBy',
                                                                                                    operator: 'asc',
                                                                                                    column: 'article_category.name'
                                                                                                }
                                                                                            ]
                                                                                        }); // return next observable
                                                                                    }).flatMap(response => {
                                                                                        // set categories dropdown
                                                                                        this.categories = _.map(<Category[]>response.data, obj => {
                                                                                            return { value: obj.id, label: obj.name };
                                                                                        }); // get categories

                return this.attachmentFamilyService.searchRecords({
                    'type': 'query',
                    'parameters': [
                        {
                            'command': 'where',
                            'column': 'attachment_family.resource_id',
                            'operator': '=',
                            'value': 'cms-article'
                        },
                        {
                            'command': 'orderBy',
                            'operator': 'asc',
                            'column': 'attachment_family.name'
                        }
                    ]
                }); // return next observable
            }).flatMap(response => {
                this.attachmentFamilies = <AttachmentFamily[]>response.data;

                                                                                                    return this.configService.getValue({
                                                                                                        key: 'pulsar.cms.statuses',
                                                                                                        translate: {
                                                                                                            lang: this.baseLang,
                                                                                                            property: 'name'
                                                                                                        }
                                                                                                    }); // return next observable
                                                                                                })
                                                                                                    .subscribe(response => {
                                                                                                    this.statuses = _.map(<Family[]>response.data, obj => {
                                                                                                        return { value: obj.id, label: obj.name };
                                                                                                    });
                                                                                                    this.statuses.unshift({ label: 'Select a status', value: '' });

                // get actual user for author
                this.user = this.authService.user();
                this.fg.patchValue({
                    author_id: this.user.id,
                    author_name: this.user.name + ' ' + this.user.surname
                });
                
            });*/

            super.init();
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
            family: '',
            status_id: ['', Validators.required],
            publish: '',
            publish_text: '',
            date: '',
            title: '',
            categories_id: [],
            slug: '',
            link: '',
            blank: '',
            sort: null,
            tags: [],
            article: '',
            attachments: this.fb.array([])
        });
    }

    /*handleChangeSection($event) {
        // change family if, change section
        if ($event.value) {
            let section = _.find(this._sections, {id: $event.value});
            this.fg.controls['family_id'].setValue(section.family.id);
            this.fg.controls['family'].setValue(section.family);

            // TODO, trigger event instead call function
            this.handleChangeFamily({value: section.family.id});
        }
    }

    handleChangeFamily($event) {
        this.fieldValues = [];
        this.fields = [];

        if ($event.value) {
            // get family object
            let family = _.find(this._families, {id: $event.value});
            this.fg.controls['family'].setValue(family);
            this.handleGetCustomFields();
        }
    }

    // get custom fields that has this object
    handleGetCustomFields() {
        if (this.fg.controls['family'].value.field_group_id) {
            // get properties
            let properties = this.object.data && this.object.data.properties ? this.object.data.properties : undefined;
            this.dynamicFormService.instance(
                this.fg.controls['family'].value.field_group_id,
                this.fg,
                properties,
                (fields) => {
                    // get all values from all custom fields
                    this.fieldValueService.searchRecords({
                        'type': 'query',
                        'parameters': [
                            {
                                'command': 'whereIn',
                                'column': 'field_value.field_id',
                                'value': _.map(fields, 'id')
                            },
                            {
                                'command': 'where',
                                'column': 'field_value.lang_id',
                                'operator': '=',
                                'value': this.lang.id
                            },
                            {
                                'command': 'orderBy',
                                'operator': 'asc',
                                'column': 'field_value.sort'
                            }
                        ]
                    })
                    .subscribe((response) => {
                        this.fieldValues = response.data;
                        this.fields = fields;
                    });
                });
        }
    }*/

    // to create a new object, do all queries to get data across GraphQL
    getDataRelationsObjectGraphQL() {
        this.objectService
            .proxyGraphQL()
            .watchQuery({
                query: this.grahpQL.queryRelationsObject,
                variables: {
                    config: {
                        key: 'pulsar.cms.statuses',
                        lang: this.baseLang,
                        property: 'name'
                    }
                }
            })
            .subscribe(({data}) => {
                this.setDataRelationsObject(data);
            });
    }

    setDataRelationsObject(data) {
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
    }
}
