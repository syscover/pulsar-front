import { User } from './../../admin/admin.models';
import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../../core/super/core-detail.component';
import { PreferenceGraphQLService } from './preference-graphql.service';
import { Preference } from './../../../shared/share.models';
import { MessageService } from 'primeng/components/common/messageservice';
import { SelectItem } from 'primeng/primeng';
import * as _ from 'lodash';

@Component({
    selector: 'ps-preference-detail',
    templateUrl: './preference-detail.component.html'
})
export class PreferenceDetailComponent extends CoreDetailComponent {

    object: any = []; // set empty object
    users: SelectItem[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: PreferenceGraphQLService,
        private messageService: MessageService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            review_validate_comments: null,
            review_moderators: null
        });
    }

    // set preferences values to get
    getCustomArgumentsGetRecord(args, params) {
        return {
            keys: [
                'review_validate_comments',
                'review_moderators'
            ]
        };
    }

    beforePatchValueEdit() {
        // mutate array to object to fit in reactive form
        const objectOutput = {};
        for (const preference of this.object) {
            objectOutput[preference['key']] = preference['value'];
        }
        this.object = objectOutput;
    }

    // instance PreferenceType[] object to do a post
    getCustomArgumentsPostRecord(args, object) {

        const objectInput = [];
        for (const propertyName in args['object']) {
            objectInput.push({
                key: propertyName,
                value: args['object'][propertyName]
            });
        }

        this.messageService.add({severity: 'success', summary: 'Preferences saved', detail: 'Your preferences has been saved'});

        return {
            preferences: objectInput
        };
    }

    setRelationsData(data: any) {
        // set users
        this.users = _.map(<User[]>data['adminUsers'], obj => {
            return { value: obj.id, label: obj.name + (obj.surname ? ' ' + obj.surname : '') };
        });
    }
}
