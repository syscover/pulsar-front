import gql from 'graphql-tag';
import { graphQL as innovaConcreteTypeGraphQL } from '../type/type.graphql';
import { graphQL as adminAttachmentFamilyGraphQL } from '../../admin/attachment-family/attachment-family.graphql';
import { graphQL as adminAttachmentsGraphQL } from '@horus/components/attachments/attachments.graphql';

const fields = `
    id
    type_id
    type {
        ${innovaConcreteTypeGraphQL.fields}
    }
    name
    description
    attachments {
        ${adminAttachmentsGraphQL.fields}
    }
`;

const relationsFields = `
    innovaConcreteTypes {
        ${innovaConcreteTypeGraphQL.fields}
    }
    adminAttachmentFamilies (sql:$sqlAttachmentFamily) {
        ${adminAttachmentFamilyGraphQL.fields}
    }
`;

export const graphQL = {
    model: 'Techedge\\InnovaConcrete\\Models\\Characteristic',
    table: 'innova_concrete_characteristic',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query InnovaConcreteGetCharacteristicsPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: innovaConcreteCharacteristicsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject: gql`
        query InnovaConcreteGetRelationsCharacteristic ($sqlAttachmentFamily:[CoreSQLInput]) {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query InnovaConcreteGetCharacteristics ($sql:[CoreSQLInput]) {
            coreObjects: innovaConcreteCharacteristics (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    queryObject: gql`
        query InnovaConcreteGetCharacteristic (
            $sql:[CoreSQLInput] 
            $sqlAttachmentFamily:[CoreSQLInput]
        ) {
            coreObject: innovaConcreteCharacteristic (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation InnovaConcreteCreateCharacteristic ($payload:InnovaConcreteCharacteristicInput!) {
            innovaConcreteCreateCharacteristic (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation InnovaConcreteUpdateCharacteristic ($payload:InnovaConcreteCharacteristicInput!) {
            innovaConcreteUpdateCharacteristic (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation InnovaConcreteDeleteCharacteristic ($id:Int!) {
            innovaConcreteDeleteCharacteristic (id:$id) {
                ${fields}
            }
        }`
};
