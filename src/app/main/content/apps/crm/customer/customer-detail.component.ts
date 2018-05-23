import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { CustomerGraphQLService } from './customer-graphql.service';
import { notEqual } from './../../../core/validations/not-equal.validation';
import * as passwordGenerator from 'generate-password-browser';

@Component({
    selector: 'dh2-customer-detail',
    templateUrl: 'customer-detail.component.html',
    animations: fuseAnimations
})
export class CustomerDetailComponent extends CoreDetailComponent  implements OnInit
{
    objectTranslation = 'CRM.CUSTOMER';
    objectTranslationGender = 'M';

    constructor(
        protected injector: Injector,
        protected graphQL: CustomerGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() 
    {
        this.fg = this.fb.group({
            id: [null, Validators.required],
            group_id: [null, Validators.required],
            company: null,
            tin: null,
            name: null,
            surname: null,
            address: null,
            email: [null, Validators.required],
            user: [null, Validators.required],
            password: null,
            repeat_password: null,
            active: false
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

