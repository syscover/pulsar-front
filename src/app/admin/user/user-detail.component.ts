import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { UserGraphQLService } from './user-graphql.service';
import { SelectItem } from 'primeng/primeng';

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

    ngOnInit() {
        /*this.profileService.getRecords()
            .subscribe((response) => {

            this.profiles = _.map(<Profile[]>response.data, obj => {
                return { value: obj.id, label: obj.name };
            });

            this.profiles.unshift({ label: 'Select a profile', value: '' });

            this.langsAux = _.map(<Lang[]>this.langs, obj => {
                return { value: obj.id, label: obj.name };
            });

        });*/
            super.init();
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required ],
            surname: '',
            email: ['', Validators.required ],
            lang_id: ['', Validators.required ],
            check_lang_id: false,
            profile_id: ['', Validators.required ],
            access: '',
            user: ['', Validators.required ],
            password: ''
        });
    }
}
