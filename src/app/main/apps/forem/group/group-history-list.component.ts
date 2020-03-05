import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '@horus/foundations/core-list-component';
import { AuthenticationService } from '@horus/services/authentication.service';
import { graphQL } from './group.graphql';
import { Type, Assistance } from './../forem.models';
import * as moment from 'moment';

@Component({
    selector: 'dh2-forem-group-history-list',
    templateUrl: './group-history-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class GroupHistoryListComponent extends CoreListComponent
{
    objectTranslation = 'FOREM.HISTORY_GROUP';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['forem_group.id', 'forem_group.composite_code', 'forem_group.name', 'admin_profile.name', 'forem_group.price_total', 'forem_group.publish', 'forem_group.featured'];
    displayedColumns = ['forem_group.id', 'forem_group.composite_code', 'forem_group.name', 'admin_profile.name', 'forem_group.type_id', 'forem_group.assistance_id', 'forem_group.starts_at', 'forem_group.ends_at', 'forem_group.publish', 'forem_group.featured', 'actions'];
    types: Type[] = [];
    assistances: Assistance[] = [];

    constructor(
        protected injector: Injector,
        private _authenticationService: AuthenticationService
    )
    {
        super(injector, graphQL);

        this.filters = [{'command': 'where', 'column': 'forem_group.ends_at', 'operator': '<', 'value': moment().format('YYYY-MM-DD HH:mm:ss')}];

        if (this.dataRoute.resource === 'forem-group-office')
        {
            this.filters.push({'command': 'where', 'column': 'forem_group.profile_id', 'operator': '=', 'value': this._authenticationService.user().profile_id });
        }
    }

    getCustomArgumentsGetRecords(args: object): object
    {
        args['configAssistances'] = {
            key: 'pulsar-forem.assistances'
        };

        args['configTypes'] = {
            key: 'pulsar-forem.types'
        };

        return args;
    }

    setRelationsData(data: any): void
    {
        this.types = data.foremTypes;
        this.assistances = data.foremAssistances;
    }
}
