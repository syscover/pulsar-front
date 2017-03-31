
export class Lang {
    id: string;
    name: string;
    ico: string;
    sort: number;
    base: boolean;
    active: boolean;
}

export class Action {
    id: string;
    name: string;
}

export class Country {
    id: string;
    lang_id: string;
    name: string;
    sort: number;
    prefix: string;
    territorial_area_1: string;
    territorial_area_2: string;
    territorial_area_3: string;
    data_lang: string;
    data: string;
}

export class Profile {
    id: number;
    name: string;
}

