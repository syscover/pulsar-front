import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { graphQL } from './winery.graphql';
import { AttachmentFamily, Country } from '../../admin/admin.models';

@Component({
    selector: 'dh2-winery-detail',
    templateUrl: 'winery-detail.component.html',
    animations: fuseAnimations
})
export class WineryDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'WINE.WINERY';
    objectTranslationGender = 'F';
    graphQL = graphQL;
    loadingSlug = false;
    attachmentFamilies: AttachmentFamily[] = [];
    countries: Country[] = [];

    constructor(
        private _injector: Injector
    ) {
        super(_injector, graphQL);
    }

    handleCheckingSlug($event): void
    {
        this.loadingSlug = $event;
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            lang_id: [null, Validators.required],
            name: [null, Validators.required],
            slug: [null, Validators.required],
            country_id: [null, Validators.required],
            excerpt: null,
            header: null,
            description: null,
            attachments: this.fb.array([])
        });
    }

    argumentsRelationsObject(): Object
    {
        const sqlAttachmentFamily = [
            {
                command: 'where',
                column: 'admin_attachment_family.resource_id',
                operator: '=',
                value: 'wine-winery'
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'admin_attachment_family.name'
            }
        ];

        const sqlCountry = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: this.params['lang'] ? this.params['lang'] : this.baseLang
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'admin_country.name'
            }
        ];

        return {
            sqlAttachmentFamily,
            sqlCountry
        };
    }

    setRelationsData(data: any): void
    {
        // admin attachment families
        this.attachmentFamilies = data.adminAttachmentFamilies;

        // set admin countries
        this.countries = data.adminCountries;
    }
}

