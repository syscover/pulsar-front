import { Lang as  LangInterface } from '@horus/types/lang';
import { Permission as  PermissionInterface } from '@horus/types/permission';

export class Action
{
    ix: number;
    id: string;
    name: string;
}

export class AttachmentLibrary
{
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
    data: object;
}

export class Attachment extends AttachmentLibrary
{
    ix: number;
    lang_id: string;
    object_id: number;
    object_type: string;
    family_id: number;
    library_id: number;
    library_file_name: string;
    attachment_library: AttachmentLibrary;
    sort: number;
    alt: string;
    title: string;
    data_lang: string[];
}

export class AttachmentFamily
{
    id: number;
    resource_id: number;
    name: string;
    width: number;
    height: number;
    fit_type: number;
    sizes: number[];
    quality: number;
    format: string;
    data: object;
}

export class AttachmentMime
{
    id: number;
    resource_id: number;
    mime: string;
}

export class Country
{
    id: string;
    lang_id: string;
    lang: Lang;
    name: string;
    slug: string;
    sort: number;
    prefix: string;
    territorial_area_1: string;
    territorial_areas_1: TerritorialArea1[];
    territorial_area_2: string;
    territorial_areas_2: TerritorialArea2[];
    territorial_area_3: string;
    territorial_areas_3: TerritorialArea3[];
    zones: string[];
    data_lang: string[];
    data: object;
}

export class DataType
{
    id: number;
    name: string;
    type: string;
}

export class Extension
{
    id: string;
    name: string;
}

export class Field
{
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
    values: FieldValue[];
    data_lang: string[];
    data: object;
}

export class FieldGroup
{
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
    data_lang: string[];
    data: object;
}

export class FieldType
{
    id: string;
    name: string;
    values: boolean;
}

export class FieldValue
{
    ix: number;
    id: string;
    counter: number;
    lang_id: string;
    field_id: number;
    name: string;
    sort: string;
    featured: string;
    data_lang: string[];
    data: object;
}

export class Frequency
{
    id: number;
    name: string;
}

export class Lang implements LangInterface
{
    id: number;
    code: string;
    name: string;
    icon: string;
    sort: number;
    active: boolean;
}

export class Package
{
    id: number;
    name: string;
    root: string;
    active: boolean;
    sort: number;
}

export class Permission implements PermissionInterface
{
    profile_id: number;
    resource_id: string;
    action_id: string;
}

export class Profile
{
    id: number;
    name: string;
    permissions: Permission[];
}

export class Report
{
    id: number;
    subject: string;
    emails: string[];
    filename: string;
    extension: string;
    frequency_id: number;
    sql: string;
}

export class Resource
{
    ix: number;
    id: string;
    name: string;
    package_id: number;
}

export class TerritorialArea1
{
    id: string;
    country_id: string;
    name: string;
    slug: string;
}

export class TerritorialArea2
{
    id: string;
    country_id: string;
    territorial_area_1_id: string;
    name: string;
    slug: string;
}

export class TerritorialArea3
{
    id: string;
    country_id: string;
    territorial_area_1_id: string;
    territorial_area_2_id: string;
    name: string;
    slug: string;
}

export class User
{
    id: string;
    name: string;
    surname: string;
    lang_id: string;
    lang: Lang;
    email: string;
    profile_id: number;
    profile: Profile;
    active: boolean;
    user: string;
    password: string;
}
