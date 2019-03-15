import gql from 'graphql-tag';
import { graphQL as innovaConcreteTypeGraphQL } from '../type/type.graphql';

const fields = `
    id
    type_id
    type {
        ${innovaConcreteTypeGraphQL.fields}
    }
    name
`;

const relationsFields = ``;

export const graphQL = {
    model: 'Techedge\\InnovaConcrete\\Models\\Characteristic',
    table: 'innova_concrete_characteristic',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query InnovaConcreteGetCharacteristicsPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: innnovaConcreteCharacteristicsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query InnovaConcreteGetCharacteristics ($sql:[CoreSQLInput]) {
            coreObjects: innnovaConcreteCharacteristics (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query InnovaConcreteGetCharacteristic ($sql:[CoreSQLInput]) {
            coreObject: innnovaConcreteCharacteristic (sql:$sql) {
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation InnovaConcreteCreateCharacteristic ($payload:InnovaConcreteCharacteristicInput!) {
            innnovaConcreteCreateCharacteristic (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation InnovaConcreteUpdateCharacteristic ($payload:InnovaConcreteCharacteristicInput!) {
            innnovaConcreteUpdateCharacteristic (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation InnovaConcreteDeleteCharacteristic ($id:Int!) {
            innnovaConcreteDeleteCharacteristic (id:$id) {
                ${fields}
            }
        }`
};
