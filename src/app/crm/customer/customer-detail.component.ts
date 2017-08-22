import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { CustomerGraphQLService } from './customer-graphql.service';
//import { AddressGraphQLService } from './address-graphql.service';
import { Country } from './../../admin/admin.models';
import { Group } from './../crm.models';
import { SelectItem, LazyLoadEvent, DataTable } from 'primeng/primeng';
import { environment } from './../../../environments/environment';
import * as _ from 'lodash';

import { CoreListComponent } from '../../shared/super/core-list.component';

@Component({
    selector: 'ps-customer-detail',
    templateUrl: './customer-detail.component.html'
})
export class CustomerDetailComponent extends CoreDetailComponent {

    groups: SelectItem[] = [];
    territorial_areas_1: SelectItem[] = [];
    countries: Country[];
    addresses: any[] = [];      // addresses of customer

    constructor(
        protected injector: Injector,
        protected graphQL: CustomerGraphQLService,
       // protected addressGraphQL: AddressGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [null, Validators.required],
            group_id: ['', Validators.required],
            company: null,
            tin: null,
            name: null,
            surname: null,
            address: null,
            email: [null, Validators.required],
            user: [null, Validators.required],
            password: null,
            //re_password: null,
            active: null
        });
    }

    getCustomArgumentsGetRecord(args: Object, params: Params): any {
        args['sqlAddress'] = [
            {
                command: 'where',
                column: 'crm_address.customer_id',
                operator: '=',
                value: params['id']
            }
        ];
        return Object.assign({}, args, this.argumentsRelationsObject());
    }

    argumentsRelationsObject(): Object {
        let sqlCountry = [
            {
                command: 'where',
                column: 'admin_country.lang_id',
                operator: '=',
                value: this.baseLang
            }
        ];

        return {
            sqlCountry
        };
    }

    setRelationsData(data: any) {
        // set groups
        this.groups = _.map(<Group[]>data['crmGroups'], obj => {
            return { value: obj.id, label: obj.name };
        });
        this.groups.unshift({ label: 'Select a group', value: '' });

        // set countries
        this.countries = data['adminCountries'];

        // set adresses
        this.addresses = data['crmAddresses'];
    }

    



    /* totalRecords: number;       // total records in datatable
    filteredRecords: number;    // filtered records over total
    columnsSearch: string[];    // columns where will be used for global searchs */

    /**
     * loadDadaTableLazy method over GraphQL
     *
     * @param event
     * @param lang          if need all results must be filtered by lang_id, not all multi language tablas have lang_is, for example table field
     * @param params        when overwrite loadDadaTableLazy function, is to add more parametes, for example field_value table need add field id
     */
    /* getRecords(event: LazyLoadEvent, filters: Object[] = undefined, sql: Object[] = undefined) {


        CoreListComponent.test();

        // set params
        let args = this.argumentsGetRecords(event, filters, sql);

        if (environment.debug) console.log('DEBUG - Arguments pass to Query Objects Pagination: ', args);

        let obs = this.objectService
            .proxyGraphQL()
            .watchQuery({
                fetchPolicy: 'network-only',
                query: this.addressGraphQL.queryPaginationObject,
                variables: args
            }).subscribe(({data}) => {

                obs.unsubscribe();

                if (environment.debug) console.log('DEBUG - data from Query Objects Pagination: ', data);

                // paginaton data
                this.totalRecords = data['coreObjectsPagination'].total;
                this.filteredRecords = data['coreObjectsPagination'].filtered;

                // instance data on object list
                this.addresses = data['coreObjectsPagination']['objects'];
            }, (error) => {
                if (environment.debug) {
                    console.log('DEBUG - Error GraphQL response in data list: ', error);
                } else {
                    this.router.navigate(['/pulsar/login']);
                }
            });
    }

    argumentsGetRecords(event: LazyLoadEvent, filters: Object[] = undefined, sql: Object[] = undefined): Object {

        let args = {}; // create empty object

        // set filters
        if (filters) {
            args['filters'] = filters;
        }

        args['sql'] = sql ? sql : []; // set sql array

        // set limit sql
        args['sql'].push({
                command: 'limit',
                value: event.rows
            });

        // set offset sql
        args['sql'].push({
                command: 'offset',
                value: event.first
            });

        // set orderBy sql
        if (event.sortField) {
            args['sql'].push({
                    command: 'orderBy',
                    operator: event.sortOrder === 1 ? 'asc' : 'desc', // asc | desc
                    column: event.sortField
                });
        }

        // set global filter sql
        if (event.globalFilter) {
            for (const column of this.columnsSearch) {
                    args['sql'].push({
                    command: 'orWhere',
                    column: column,
                    operator: 'like',
                    value: `%${event.globalFilter}%`
                });
            }
        }

        return args;
    } */
}
