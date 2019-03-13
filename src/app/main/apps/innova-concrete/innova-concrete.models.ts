export class Characteristic
{
    id: number;
    name: string;
    type_id: number;
    type: Type;
}

export class Group
{
    id: number;
    name: string;
}

export class Type
{
    id: number;
    name: string;
}

export class People
{
    id: number;
    name: string;
    group_id: number;
    group: Group;
}

export class Monument
{
    id: number;
    original_name: string;
    current_name: string;
    other_denominations: string;
    original_use: string;
    current_use: string;
    commission: number;
    completion: number;
    description: string;
    rapporteur_name: string;
    rapporteur_email: string;
    rapporteur_date: number;
    percentage_progress: number;
    links: object;
    country_id: string;
    province: string;
    address: string;
    locality: string;
    zip: string;
    latitude: number;
    longitude: number;
}

