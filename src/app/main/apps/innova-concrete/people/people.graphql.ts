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

const relationsFields = `
    innovaConcreteGroups {
        ${innovaConcreteGroupGraphQL.fields}
    }
`;

export const graphQL = {
    model: 'Techedge\\InnovaConcrete\\Models\\People',
    table: 'innova_concrete_people',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query InnovaConcreteGetPeoplesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: innovaConcretePeoplesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject: gql`
        query InnovaConcreteGetRelationsPeople {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query InnovaConcreteGetPeoples ($sql:[CoreSQLInput]) {
            coreObjects: innovaConcretePeoples (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    queryObject: gql`
        query InnovaConcreteGetPeople ($sql:[CoreSQLInput]) {
            coreObject: innovaConcretePeople (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation InnovaConcreteCreatePeople ($payload:InnovaConcretePeopleInput!) {
            innovaConcreteCreatePeople (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation InnovaConcreteUpdatePeople ($payload:InnovaConcretePeopleInput!) {
            innovaConcreteUpdatePeople (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation InnovaConcreteDeletePeople ($id:Int!) {
            innovaConcreteDeletePeople (id:$id) {
                ${fields}
            }
        }`
};
