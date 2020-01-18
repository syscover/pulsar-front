export class AcademicLevel
{
    id: number;
    name: string;
}

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
    price_total: number;
    price_hour: number;
    contents: string;
    requirements: string;
    observations: string;
}

export class AddressType
{
    id: number;
    name: string;
}

export class Assistance
{
    id: number;
    name: string;
}

export class Availability 
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

export class EmploymentSituation
{
    id: number;
    name: string;
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

export class FunctionalArea
{
    id: number;
    name: string;
}

export class Gender
{
    id: number;
    name: string;
}

export class Group
{
    id: number;
    profile_id: number;
    prefix_id: number;
    code: string;
    name: string;
    slug: string;
    category_id: number;
    target_id: number;
    assistance_id: number;
    type_id: number;
    certificate: string;
    certificate_code: string;
    hours: number;
    subsidized_amount: number;
    price_total: number;
    price_hour: number;
    contents_excerpt: string;
    contents: string;
    requirements: string;
    observations: string;
    action_id: number;
    expedient_id: number;
    starts_at: string;
    ends_at: string;
    schedule: string;
    selection_date
    publish: boolean;
    open: boolean;
    featured: boolean;
    country_id: string;
    territorial_area_1_id: string;
    territorial_area_2_id: string;
    territorial_area_3_id: string;
    zip: string;
    locality: string;
    address: string;
    latitude: number;
    longitude: number;
    trainer_name_1: string;
    trainer_hours_1: string;
    trainer_name_2: string;
    trainer_hours_2: string;
    trainer_name_3: string;
    trainer_hours_3: string;
}

export class GroupPrefix
{
    id: number;
    name: string;
}

export class Locality
{
    id: number;
    code: number;
    province_id: number;
    province: Province;
    name: string;
}

export class Modality
{
    id: number;
    name: string;
    code: string;
    inscription_type: number;
}

export class ProfessionalCategory
{
    id: number;
    name: string;
}

export class Profile
{
    id: number;
    name: string;
    publish: boolean;
}

export class Province
{
    id: number;
    code: number;
    name: string;
}

export class Step
{
    id: number;
    name: string;
    active: boolean;
}

export class Target
{
    id: number;
    name: string;
}

export class TeacherTraining
{
    id: number;
    name: string;
}

export class Type
{
    id: number;
    name: string;
}

export class UnemployedSituation
{
    id: number;
    name: string;
}
