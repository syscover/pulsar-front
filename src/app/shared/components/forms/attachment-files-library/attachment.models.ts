
export class AttachmentLibrary {
    id: number;
    name: string;
    file_name: string;
    url: string;
    mime: string;
    size: number;
    width: number;
    height: number;
    data: string;
}

export class Attachment extends AttachmentLibrary {
    lang_id: string;
    resource_id: number;
    object_id: number;
    family_id: number;
    sort: number;
    library_id: number;
    library_file_name: string;
    data_lang: string;
}
