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
            coreObjectsPagination: innnovaConcreteGroupsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query InnovaConcreteGetGroups ($sql:[CoreSQLInput]) {
            coreObjects: innnovaConcreteGroups (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query InnovaConcreteGetGroup ($sql:[CoreSQLInput]) {
            coreObject: innnovaConcreteGroup (sql:$sql) {
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation InnovaConcreteCreateGroup ($payload:InnovaConcreteGroupInput!) {
            innnovaConcreteCreateGroup (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation InnovaConcreteUpdateGroup ($payload:InnovaConcreteGroupInput!) {
            innnovaConcreteUpdateGroup (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation InnovaConcreteDeleteGroup ($id:Int!) {
            innnovaConcreteDeleteGroup (id:$id) {
                ${fields}
            }
        }`
};
