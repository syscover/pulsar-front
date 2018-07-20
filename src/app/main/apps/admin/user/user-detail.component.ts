import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { UserGraphQLService } from './user-graphql.service';
import { Profile, Lang } from './../admin.models';
import { notEqual } from './../../../core/validations/not-equal.validation';
import * as passwordGenerator from 'generate-password-browser';

@Component({
    selector: 'dh2-user-detail',
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
        protected injector: Injector,
        protected graphQL: UserGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() 
    {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            name: [null, Validators.required],
            surname: null,
            email: [null, Validators.required],
            lang_id: [null, Validators.required],
            profile_id: [null, Validators.required],
            active: false,
            user: [null, Validators.required],
            password: null,
            repeat_password: null
        });
    }

    ngOnInit() 
    {   
        super.ngOnInit();

        // set validator after ngOnInit to get AbstractControl implementation in notEqual custom validation
        this.fg.controls['repeat_password'].setValidators(notEqual('password', this.translations['APPS.PASSWORD'], this.translations['APPS.REPEAT_PASSWORD']));

        // set required password in create action
        if (this.dataRoute.action === 'create')
        {
            this.fg.controls['password'].setValidators(Validators.required);
            this.fg.controls['repeat_password'].setValidators(Validators.required);
        }
    }

    setRelationsData(data: any) 
    {
        // set admin langs
        this.langsAux = data.adminLangs;

        // set admin profiles
        this.profiles = data.adminProfiles;
    }

    getCustomArgumentsCreatePostRecord(args, object)
    { 
        // delete repeat_password from object to ajust to user class
        delete args['object']['repeat_password'];

        return args;
    }

    getCustomArgumentsEditPostRecord(args, object) 
    {
        // delete repeat_password from object to ajust to user class
        delete args['object']['repeat_password'];

        return args;
    }

    generatePassword()
    {
        const password = passwordGenerator.generate({
            length: 10,
            numbers: true
        });
        
        this.fg.controls['password'].setValue(password);
        this.fg.controls['repeat_password'].setValue(password);
    }
}
