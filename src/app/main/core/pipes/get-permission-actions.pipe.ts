import { Pipe, PipeTransform } from '@angular/core';
import { Permission } from '../../apps/admin/admin.models';
import * as _ from 'lodash';

@Pipe({
    name: 'getPermissionActions'
})
export class GetPermissionActionsPipe implements PipeTransform
{
    transform(permissions: Permission[], resource_id: string): string[] // Action[]
    {
        // all config id are string
        const actions = _.filter(permissions, {resource_id: resource_id});

        return _.map(actions, 'action_id');
    }
}
