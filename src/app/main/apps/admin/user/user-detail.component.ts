import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '@horus/foundations/core-detail-component';
import { Profile, Lang } from '../admin.models';
import { notEqual } from '@horus/validations/not-equal.validation';
import * as passwordGenerator from 'generate-password-browser';
import { graphQL } from './user.graphql';

@Component({
    selector: 'dh2-admin-user-detail',
    templateUrl: 'user-detail.component.html',
    animations: fuseAnimations
})
export class UserDetailComponent extends CoreDetailComponent implements OnInit
{
    objectTranslation = 'ADMIN.USER';
    objectTranslationGender = 'M';
    profiles: Profile[] = [];
    langsAux: Lang[] = [];
    inputType = 'password';

    constructor(
        protected injector: Injector
    ) 
    {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required],
            surname: '',
            email: ['', Validators.required],
            lang_id: ['', Validators.required],
            profile_id: ['', Validators.required],
            active: false,
            user: ['', Validators.required],
            password: '',
            repeat_password: ''
        });
    }

    ngOnInit(): void
    {   
        super.ngOnInit();

        // set required password in create action
        if (this.dataRoute.action === 'create')
        {
            this.fg.get('password').setValidators(Validators.required);
            this.fg.get('repeat_password').setValidators([Validators.required, notEqual('password', this.translations['APPS.PASSWORD'], this.translations['APPS.REPEAT_PASSWORD'])]);
        }
        else {
            // set validator in ngOnInit to get AbstractControl implementation in notEqual custom validation
            this.fg.get('repeat_password').setValidators(notEqual('password', this.translations['APPS.PASSWORD'], this.translations['APPS.REPEAT_PASSWORD']));
        }
    }

    setRelationsData(data: any): void
    {
        // set admin langs
        this.langsAux = data.adminLangs;

        // set admin profiles
        this.profiles = data.adminProfiles;
    }

    getCustomArgumentsCreatePostRecord(args, object): object
    { 
        // delete repeat_password from object to ajust to user class
        delete args['payload']['repeat_password'];

        return args;
    }

    getCustomArgumentsEditPostRecord(args, object): object
    {
        // delete repeat_password from object to ajust to user class
        delete args['payload']['repeat_password'];

        return args;
    }

    generatePassword(): void
    {
        const password = passwordGenerator.generate({
            length: 10,
            numbers: true
        });
        
        this.fg.get('password').setValue(password);
        this.fg.get('repeat_password').setValue(password);
    }
}
