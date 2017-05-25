
export class Lang {
    id: string;
    name: string;
    icon: string;
    sort: number;
    active: boolean;
}

export class Country {
    id: string;
    lang_id: string;
    lang: Lang;
    name: string;
    sort: number;
    prefix: string;
    territorial_area_1: string;
    territorial_area_2: string;
    territorial_area_3: string;
    data_lang: string;
    data: string;
}

export class Package {
    id: number;
    name: string;
    root: string;
    active: boolean;
    sort: number;
}

export class FieldGroup {
    id: number;
    name: string;
    resource_id: string;
    field_type_id: number;
    field_type_name: string;
    data_type_id: number;
    required: boolean;
    sort: number;
    max_length: number;
    pattern: string;
    label_size: number;
    field_size: number;
    data_lang: string;
    data: string;
}

export class FieldType {
    id: string;
    name: string;
}

export class DataType {
    id: number;
    name: string;
    type: string;
}

export class Field {
    id: number;
    field_group_id: number;
    name: string;
    labels: string[];
    field_type_id: string;
    field_type_name: string;
    data_type_id: number;
    data_type_name: string;
    required: boolean;
    sort: number;
    max_length: number;
    pattern: string;
    label_class: string;
    component_class: string;
    data_lang: string;
    data: string;
}

export class FieldValue {
    id: string;
    counter: number;
    lang_id: string;
    field_id: number;
    name: string;
    sort: string;
    featured: string;
    data_lang: string;
    data: string;
}

export class Action {
    id: string;
    name: string;
}

export class Resource {
    id: string;
    name: string;
    package_id: number;
}

export class Profile {
    id: number;
    name: string;
}

export class AttachmentMime {
    id: number;
    resource_id: number;
    mime: string;
}

export class AttachmentFamily {
    id: number;
    resource_id: number;
    name: string;
    width: number;
    height: number;
    data: string;
}

export class AttachmentLibrary {
    id: number;
    name: string;
    file_name: string;
    extension: string;
    base_path: string;
    url: string;
    mime: string;
    size: number;
    width: number;
    height: number;
    sort: number;
    data: string;
}

export class Attachment extends AttachmentLibrary {
    lang_id: string;
    resource_id: number;
    object_id: number;
    family_id: number;
    library_id: number;
    library_file_name: string;
    data_lang: string;
}
