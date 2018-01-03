import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../../core/super/core-detail.component';
import { LangGraphQLService } from './lang-graphql.service';

@Component({
    selector: 'ps-lang-detail',
    templateUrl: 'lang-detail.component.html'
})
export class LangDetailComponent extends CoreDetailComponent {

    constructor(
        protected injector: Injector,
        protected graphQL: LangGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            ix: null,
            id: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
            name: ['', Validators.required],
            icon: ['', Validators.required],
            sort: '',
            active: ''
        });
    }
}