import gql from 'graphql-tag';
import { graphQL as innovaConcretePeopleGraphQL } from '../people/people.graphql';
import { graphQL as innovaConcreteCharacteristicGraphQL } from '../characteristic/characteristic.graphql';
import { graphQL as adminCountry } from '../../admin/country/country.graphql';

const fields = `
    id
    original_name
    current_name
    slug
    other_denominations
    original_use
    current_use
    peoples {
        ${innovaConcretePeopleGraphQL.fields}
    }
    characteristics {
        ${innovaConcreteCharacteristicGraphQL.fields}
    }
    commission
    completion
    description
    rapporteur_name
    rapporteur_email
    rapporteur_date
    percentage_progress
    links
    country_id
    countries {
        ${adminCountry.fields}
    }
    province
    address
    locality
    zip
    latitude
    longitude
`;

const relationsFields = `
    adminCountries (sql:$sqlCountry) {
        ${adminCountry.fields}
    }
    innovaConcretePeoples {
        ${innovaConcretePeopleGraphQL.fields}
    }
    innovaConcreteCharacteristics {
        ${innovaConcreteCharacteristicGraphQL.fields}
    }
`;

export const graphQL = {
    model: 'Techedge\\InnovaConcrete\\Models\\Monument',
    table: 'innova_concrete_monument',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query InnovaConcreteGetMonumentsPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: innovaConcreteMonumentsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject : gql`
        query InnovaConcreteRelationsMonument ($sqlCountry:[CoreSQLInput]) {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query InnovaConcreteGetMonuments ($sql:[CoreSQLInput]) {
            coreObjects: innovaConcreteMonuments (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query InnovaConcreteGetMonument ($sql:[CoreSQLInput] $sqlCountry:[CoreSQLInput]) {
            coreObject: innovaConcreteMonument (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation InnovaConcreteCreateMonument ($payload:InnovaConcreteMonumentInput!) {
            innovaConcreteCreateMonument (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation InnovaConcreteUpdateMonument ($payload:InnovaConcreteMonumentInput!) {
            innovaConcreteUpdateMonument (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation InnovaConcreteDeleteMonument ($id:Int!) {
            innovaConcreteDeleteMonument (id:$id) {
                ${fields}
            }
        }`
};
