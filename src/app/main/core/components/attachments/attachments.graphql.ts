import { graphQL as adminAttachmentLibraryGraphQL } from './attachments-library.graphql';
import { graphQL as adminAttachmentFamilyGraphQL } from '../../../apps/admin/attachment-family/attachment-family.graphql';

export const graphQL = {

    fields: `
        alt
        base_path
        extension
        family_id
        file_name
        height
        id
        ix
        lang_id
        library_file_name
        library_id
        mime
        object_id
        object_type
        sort
        title
        url
        size
        width
        attachment_library {
            ${adminAttachmentLibraryGraphQL.fields}
        }
    `,

    relationsFields: `
        adminAttachmentFamilies (sql:$sqlAttachmentFamily) {
            ${adminAttachmentFamilyGraphQL.fields}
        }
    `
};
