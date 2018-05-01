import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { PreferenceGraphQLService } from './preference-graphql.service';
import { User } from './../../admin/admin.models';
import * as _ from 'lodash';

@Component({
    selector: 'dh2-preference-detail',
    templateUrl: './preference-detail.component.html',
    animations: fuseAnimations
})
export class PreferenceDetailComponent extends CoreDetailComponent 
{
    objectTranslation = 'APPS.SETTING';
    objectTranslationGender = 'M';
    object: any = {}; // set empty object
    users: User[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: PreferenceGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() 
    {
        this.fg = this.fb.group({
            review_validate_comments: null,
            review_moderators: null
        });
    }

    getCustomArgumentsGetRecord(args, params) 
    {
        return {
            keys: [
                'review_validate_comments',
                'review_moderators'
            ]
        };
    }

    beforePatchValueEdit() 
    {
        // mutate array to object to fit in reactive form
        const objectOutput = {};
        for (const preference of this.object) 
        {
            objectOutput[preference['key']] = preference['value'];
        }
        this.object = objectOutput;
    }

    // instance PreferenceType[] object to do a post
    getCustomArgumentsPostRecord(args, object) 
    {
        const objectInput = [];

        for (const propertyName of Object.keys(args['object']))
        {
            objectInput.push({
                key: propertyName,
                value: args.object[propertyName]
            });
        }

        // this.messageService.add({severity: 'success', summary: 'Preferences saved', detail: 'Your preferences has been saved'});

        return {
            preferences: objectInput
        };
    }

    setRelationsData(data: any) 
    {
        // set admin users
        this.users = data.adminUsers;
    }
}
