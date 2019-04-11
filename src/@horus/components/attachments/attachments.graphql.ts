import { graphQL as adminAttachmentLibraryGraphQL } from './attachments-library.graphql';
import { graphQL as adminAttachmentFamilyGraphQL } from 'app/main/apps/admin/attachment-family/attachment-family.graphql';

const fields = `
    ix
    id
    title
    alt
    attachment_library {
        ${adminAttachmentLibraryGraphQL.fields}
    }
    base_path
    extension
    family_id
    file_name
    height
    lang_id
    library_file_name
    library_id
    mime
    object_id
    object_type
    sort
    url
    size
    width
`;

const relationsFields = `
    adminAttachmentFamilies (sql:$sqlAttachmentFamily) {
        ${adminAttachmentFamilyGraphQL.fields}
    }
`;

export const graphQL = {
    fields,
    relationsFields
};
