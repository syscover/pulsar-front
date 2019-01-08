export class Action
{
    id: number;
    code: string;
    name: string;
    slug: string;
    category_id: number;
    target_id: number;
    assistance_id: number;
    type_id: number;
    hours: number;
    online: boolean;
    subsidized: boolean;
    price: number;
    price_hour: number;
    contents: string;
    requirements: string;
    observations: string;
}

export class Assistance
{
    id: number;
    name: string;
}

export class Category
{
    id: number;
    name: string;
    slug: string;
}

export class EmploymentOffice
{
    id: number;
    profile_id: number;
    code: string;
    name: string;
    slug: string;
    country_id: string;
    territorial_area_1_id: string;
    territorial_area_2_id: string;
    territorial_area_3_id: string;
    zip: string;
    locality: string;
    address: string;
    latitude: string;
    longitude: string;
}

export class Expedient
{
    id: number;
    modality_id: number;
    year: number;
    name: string;
    starts_at: any;
    ends_at: any;
}

export class Modality
{
    id: number;
    name: string;
    code: string;
    inscription_type: number;
}

export class Target
{
    id: number;
    name: string;
}

export class Type
{
    id: number;
    name: string;
}
