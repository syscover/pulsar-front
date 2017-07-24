import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { UserGraphQLService } from './user-graphql.service';
import { SelectItem } from 'primeng/primeng';
import { Profile } from './../admin.models';
import * as _ from 'lodash';

@Component({
    selector: 'ps-user-detail',
    templateUrl: './user-detail.component.html'
})
export class UserDetailComponent extends CoreDetailComponent {

    profiles: SelectItem[] = [];
    langsAux: SelectItem[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: UserGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required ],
            surname: '',
            email: ['', Validators.required ],
            lang_id: ['', Validators.required ],
            profile_id: ['', Validators.required ],
            access: '',
            user: ['', Validators.required ],
            password: ''
        });
    }

    // ovewrite this method to custom column id by column resource.id
    getArgsToGetRecord(params: Params) {

        let args = {
            model: this.graphQL.objectModel,
            sql: [{
                command: 'where',
                column: 'user.id',
                operator: '=',
                value: params['id']
            }]
        };

        return args;
    }

    setDataRelationsObject(data: any) {
        // set langs
        this.langsAux = _.map(<Profile[]>data['adminLangs'], obj => {
            return { value: obj.id, label: obj.name };
        });
        this.langsAux.unshift({ label: 'Select a lang', value: '' });

        // set profiles
        this.profiles = _.map(<Profile[]>data['adminProfiles'], obj => {
            return { value: obj.id, label: obj.name };
        });
        this.profiles.unshift({ label: 'Select a profile', value: '' });
    }
}
