import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { PreferenceGraphQLService } from './preference-graphql.service';
import { User } from './../../admin/admin.models';

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

    createForm(): void
    {
        this.fg = this.fb.group({
            review_validate_comments: null,
            review_moderators: null
        });
    }

    getCustomArgumentsGetRecord(args, params): Object
    {
        return {
            keys: [
                'review_validate_comments',
                'review_moderators'
            ]
        };
    }

    beforePatchValueEdit(): void
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
    getCustomArgumentsPostRecord(args, object): Object
    {
        const objectInput = [];

        for (const propertyName of Object.keys(args['payload']))
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

    setRelationsData(data: any): void
    {
        // set admin users
        this.users = data.adminUsers;
    }
}
