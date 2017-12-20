import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { PreferenceGraphQLService } from './preference-graphql.service';
import { Preference } from './../../shared/share.models';
import * as _ from 'lodash';

@Component({
    selector: 'ps-preference-detail',
    templateUrl: './preference-detail.component.html'
})
export class PreferenceDetailComponent extends CoreDetailComponent {

    object: any = []; // set empty object

    constructor(
        protected injector: Injector,
        protected graphQL: PreferenceGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            review_validate_comments: null,
        });
    }

    // set preferences values to get
    getCustomArgumentsGetRecord(args, params) {
        return {
            keys: [
                'review_validate_comments'
            ]
        };
    }

    beforePatchValueEdit() {
        // mutate array to object to fit in reactive form
        let objectOutput = {};
        for (let preference of this.object) {
            objectOutput[preference['key']] = preference['value'];
        }
        this.object = objectOutput;
    }

    // instance PreferenceType[] object to do a post
    getCustomArgumentsPostRecord(args, object) {

        console.log(args);

        let objectInput = [];
        for (let propertyName in object) {
            objectInput.push({
                key: propertyName,
                value: args['object'][propertyName]
            });
        }

        return {
            preferences: objectInput
        };
    }
}
