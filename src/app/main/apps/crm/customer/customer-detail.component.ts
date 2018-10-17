import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { CustomerGraphQLService } from './customer-graphql.service';
import { notEqual } from './../../../core/validations/not-equal.validation';
import { CustomerGroup } from './../crm.models';
import { Country } from './../../admin/admin.models';
import * as passwordGenerator from 'generate-password-browser';

@Component({
    selector: 'dh2-customer-detail',
    templateUrl: 'customer-detail.component.html',
    animations: fuseAnimations
})
export class CustomerDetailComponent extends CoreDetailComponent  implements OnInit
{
    objectTranslation = 'APPS.CUSTOMER';
    objectTranslationGender = 'M';
    customerGroups: CustomerGroup[] = [];
    inputType = 'password';

    // properties for territories
    countries: Country[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: CustomerGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            group_id: [null, Validators.required],
            company: null,
            tin: null,
            name: null,
            surname: null,
            email: [null, Validators.required],
            active: false,
            user: [null, Validators.required],
            password: null,
            repeat_password: null,
            address: null,
            country_id: null,
            territorial_area_1_id: null,
            territorial_area_2_id: null,
            territorial_area_3_id: null,
            zip: null,
            locality: null,
            latitude: null,
            longitude: null
        });
    }

    ngOnInit(): void
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

    getCustomArgumentsCreatePostRecord(args, object): Object
    { 
        // delete repeat_password from object to ajust to user class
        delete args['payload']['repeat_password'];

        return args;
    }

    getCustomArgumentsEditPostRecord(args, object): Object
    {
        // delete repeat_password from object to adjust to user class
        delete args['payload']['repeat_password'];

        return args;
    }

    argumentsRelationsObject(): Object
    {
        const sqlCountry = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: this.params['lang'] ? this.params['lang'] : this.baseLang
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'admin_country.name'
            }
        ];

        return {
            sqlCountry
        };
    }

    setRelationsData(data: any): void
    {
        // set crm customer groups
        this.customerGroups = data.crmCustomerGroups;

        // set admin countries
        this.countries = data.adminCountries;

        /* 
        // set adresses
        this.addresses = data['crmAddresses']; */
    }

    generatePassword(): void
    {
        const password = passwordGenerator.generate({
            length: 10,
            numbers: true
        });
        
        this.fg.controls['password'].setValue(password);
        this.fg.controls['repeat_password'].setValue(password);
    }
}
