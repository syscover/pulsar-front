import gql from 'graphql-tag';

const fields = `
    id
    name
`;

const relationsFields = ``;

export const graphQL = {
    model: 'Techedge\\InnovaConcrete\\Models\\Group',
    table: 'innova_concrete_group',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query InnovaConcreteGetGroupsPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: innovaConcreteGroupsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query InnovaConcreteGetGroups ($sql:[CoreSQLInput]) {
            coreObjects: innovaConcreteGroups (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query InnovaConcreteGetGroup ($sql:[CoreSQLInput]) {
            coreObject: innovaConcreteGroup (sql:$sql) {
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation InnovaConcreteCreateGroup ($payload:InnovaConcreteGroupInput!) {
            innovaConcreteCreateGroup (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation InnovaConcreteUpdateGroup ($payload:InnovaConcreteGroupInput!) {
            innovaConcreteUpdateGroup (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation InnovaConcreteDeleteGroup ($id:Int!) {
            innovaConcreteDeleteGroup (id:$id) {
                ${fields}
            }
        }`
};
