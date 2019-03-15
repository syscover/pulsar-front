import gql from 'graphql-tag';
import { graphQL as innovaConcreteGroupGraphQL } from '../group/group.graphql';

const fields = `
    id
    original_name
    current_name
    other_denominations
    original_use
    current_use
    commission
    completion
    description
    rapporteur_name
    rapporteur_email
    rapporteur_date
    percentage_progress
    links
    country_id
    province
    address
    locality
    zip
    latitude
    longitude
`;

const relationsFields = ``;

export const graphQL = {
    model: 'Techedge\\InnovaConcrete\\Models\\Monument',
    table: 'innova_concrete_monument',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query InnovaConcreteGetMonumentsPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: innnovaConcreteMonumentsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query InnovaConcreteGetMonuments ($sql:[CoreSQLInput]) {
            coreObjects: innnovaConcreteMonuments (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query InnovaConcreteGetMonument ($sql:[CoreSQLInput]) {
            coreObject: innnovaConcreteMonument (sql:$sql) {
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation InnovaConcreteCreateMonument ($payload:InnovaConcreteMonumentInput!) {
            innnovaConcreteCreateMonument (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation InnovaConcreteUpdateMonument ($payload:InnovaConcreteMonumentInput!) {
            innnovaConcreteUpdateMonument (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation InnovaConcreteDeleteMonument ($id:Int!) {
            innnovaConcreteDeleteMonument (id:$id) {
                ${fields}
            }
        }`
};
