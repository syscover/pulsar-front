import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '../../../core/foundations/core-detail-compoment';
import { notEqual } from '@horus/validations/not-equal.validation';
import { CustomerGroup } from '../crm.models';
import { Country } from '../../admin/admin.models';
import * as passwordGenerator from 'generate-password-browser';
import { graphQL } from './customer.graphql';

@Component({
    selector: 'dh2-crm-customer-detail',
    templateUrl: 'customer-detail.component.html',
    animations: fuseAnimations
})
export class CustomerDetailComponent extends CoreDetailComponent  implements OnInit
{
    objectTranslation = 'APPS.CUSTOMER';
    objectTranslationGender = 'M';
    customerGroups: CustomerGroup[] = [];
    countries: Country[] = [];
    inputType = 'password';

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            group_id: ['', Validators.required],
            company: '',
            tin: '',
            name: '',
            surname: '',
            email: ['', Validators.required],
            active: false,
            user: ['', Validators.required],
            password: '',
            repeat_password: '',
            address: '',
            country_id: '',
            territorial_area_1_id: '',
            territorial_area_2_id: '',
            territorial_area_3_id: '',
            zip: '',
            locality: '',
            latitude: '',
            longitude: ''
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

    getCustomArgumentsCreatePostRecord(args, object): object
    { 
        // delete repeat_password from object to ajust to user class
        delete args['payload']['repeat_password'];

        return args;
    }

    getCustomArgumentsEditPostRecord(args, object): object
    {
        // delete repeat_password from object to adjust to user class
        delete args['payload']['repeat_password'];

        return args;
    }

    argumentsRelationsObject(): object
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

        this.fg.get('password').setValue(password);
        this.fg.get('repeat_password').setValue(password);
    }
}
