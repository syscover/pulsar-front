import gql from 'graphql-tag';

const fields = `
    id
    origin_id
    ic_party_id
    ic_component_id
    interface_name
    interface_name_space
    iflow_name
    responsible_user_account_id
    last_change_user_account_id
    last_change_date_time
    folder_path_id
    description
    application_id
    critical
    complex
    compound
    pep
    area
    contact_id_of
    contact_id_ot
`;

const relationsFields = ``;

export const graphQL = {
    model: 'Techedge\\Bcci\\Models\\SappiIc',
    table: 'bcci_sappi_ic',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query BcciGetSappiIcsPagination ($filters:[CoreSQLInput] $sql:[CoreSQLInput]) {
            coreObjectsPagination: bcciSappiIcsPagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query BcciGetSappiIcs ($sql:[CoreSQLInput]) {
            coreObjects: bcciSappiIcs (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query BcciGetSaapiIc ($sql:[CoreSQLInput]) {
            coreObject: bcciSaapiIc (sql:$sql) {
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation BcciCreateSaapiIc ($payload:BcciSaapiIcInput!) {
            bcciCreateSaapiIc (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation BcciUpdateSaapiIc ($payload:BcciSaapiIcInput!) {
            bcciUpdateSaapiIc (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation BcciDeleteSaapiIc ($id:Int!) {
            bcciDeleteSaapiIc (id:$id) {
                ${fields}
            }
        }`
};
