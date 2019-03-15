import gql from 'graphql-tag';
import { graphQL as innovaConcreteGroupGraphQL } from '../group/group.graphql';

const fields = `
    id
    group_id
    group {
        ${innovaConcreteGroupGraphQL.fields}
    }
    name
`;

const relationsFields = ``;

export const graphQL = {
    model: 'Techedge\\InnovaConcrete\\Models\\Type',
    table: 'innova_concrete_type',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query InnovaConcreteGetTypesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: innnovaConcreteTypesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query InnovaConcreteGetTypes ($sql:[CoreSQLInput]) {
            coreObjects: innnovaConcreteTypes (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query InnovaConcreteGetType ($sql:[CoreSQLInput]) {
            coreObject: innnovaConcreteType (sql:$sql) {
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation InnovaConcreteCreateType ($payload:InnovaConcreteTypeInput!) {
            innnovaConcreteCreateType (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation InnovaConcreteUpdateType ($payload:InnovaConcreteTypeInput!) {
            innnovaConcreteUpdateType (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation InnovaConcreteDeleteType ($id:Int!) {
            innnovaConcreteDeleteType (id:$id) {
                ${fields}
            }
        }`
};
