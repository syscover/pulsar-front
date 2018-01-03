import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/graphql/graphql-schema.class';
import gql from 'graphql-tag';

@Injectable()
export class CronJobGraphQLService extends GraphQLSchema {

    queryPaginationObject = gql`
        query AdminGetCronJobsPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: adminCronJobsPagination (sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

    queryRelationsObject = gql`
        query AdminGetRelationsCronJob {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query AdminGetCronJobs ($sql:[CoreSQLQueryInput]) {
            coreObjects: adminCronJobs (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    queryObject = gql`
        query AdminGetCronJob ($sql:[CoreSQLQueryInput]) {
            coreObject: adminCronJob (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationAddObject = gql`
        mutation AdminAddCronJob ($object:AdminCronJobInput!) {
            adminAddCronJob (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation AdminUpdateCronJob ($object:AdminCronJobInput!) {
            adminUpdateCronJob (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation AdminDeleteCronJob ($id:Int!) {
            adminDeleteCronJob (id:$id){
                ${this.fields}
            }
        }`;

    init() {
        this.model = 'Syscover\\Admin\\Models\\CronJob';
        this.table = 'admin_cron_job';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on AdminCronJob {
                    id
                    name
                    package_id
                    package {
                        id
                        name
                    }
                    cron_expression
                    command
                    last_run
                    next_run
                    active
                }
        `;

        this.relationsFields = `
            adminPackages {
                id
                name
            }
        `;

        super.init();
    }
}
