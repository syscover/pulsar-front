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
            coreObjectsPagination: innovaConcreteTypesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query InnovaConcreteGetTypes ($sql:[CoreSQLInput]) {
            coreObjects: innovaConcreteTypes (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query InnovaConcreteGetType ($sql:[CoreSQLInput]) {
            coreObject: innovaConcreteType (sql:$sql) {
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation InnovaConcreteCreateType ($payload:InnovaConcreteTypeInput!) {
            innovaConcreteCreateType (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation InnovaConcreteUpdateType ($payload:InnovaConcreteTypeInput!) {
            innovaConcreteUpdateType (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation InnovaConcreteDeleteType ($id:Int!) {
            innovaConcreteDeleteType (id:$id) {
                ${fields}
            }
        }`
};
