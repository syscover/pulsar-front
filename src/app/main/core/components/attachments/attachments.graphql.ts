export const graphQL = {

    fields: `
        attachments {
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
                base_path
                extension
                file_name
                height
                id
                mime
                name
                size
                url
                width
            }
        }
    `,

    relationsFields: `
        adminAttachmentFamilies (sql:$sqlAttachmentFamily) {
            id
            name
            resource_id
            width
            height
            sizes
            quality
            format
        }
    `
};
