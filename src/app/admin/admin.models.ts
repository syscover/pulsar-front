
export class Lang {
    id: string;
    name: string;
    icon: string;
    sort: number;
    base: boolean;
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

