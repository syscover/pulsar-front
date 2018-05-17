
export class Group 
{
    id: number;
    name: string;
}

export class AddressType 
{
    id: number;
    name: string;
}

export class Customer 
{
    id: number;
    lang_id: string;
    remember_token: string;
    group_id: number;
    date: number;
    company: string;
    tin: string;
    gender_id: number;
    treatment_id: number;
    state_id: number;
    name: string;
    surname: string;
    avatar: string;
    birth_date: number;
    email: string;
    phone: string;
    movile: string;

    // access
    user: string;
    password: string;
    active: boolean;
    confirmed: boolean;

    // geolocation data
    country_id: string;
    territorial_area_1_id: string;
    territorial_area_2_id: string;
    territorial_area_3_id: string;
    zip: string;
    locality: string;
    address: string;
    latitude: string;
    longitude: string;

    // customs fields
    field_group_id: string;

    // data
    data: string;
}
