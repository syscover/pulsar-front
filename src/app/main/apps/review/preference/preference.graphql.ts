import gql from 'graphql-tag';
import { graphQL as adminUser } from './../../admin/user/user.graphql';

const fields = `
    key
    value
`;

const relationsFields = `
    adminUsers {
        ${adminUser.fields}
    }
`;

export const graphQL = {

    fields,
    relationsFields,

    queryObject: gql`
        query ReviewGetPreferences ($keys:[String]!) {
            coreObject: corePreferences (keys:$keys) {
                ${this.fields}
            }
            ${this.relationsFields}
        }`,

    mutationUpdateObject: gql`
        mutation ReviewUpdatePreferences ($preferences:[CorePreferenceInput]) {
            coreUpdatePreferences (preferences:$preferences) {
                ${this.fields}
            }
        }`,
};
