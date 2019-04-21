export interface Application
{
    id: number;
    name: string;
    root: string;
    active: boolean;
    sort: number;
}

export interface DataRoute
{
    action: string;
}

export interface HorusConfig
{
    fieldAppearance: 'legacy' | 'standard' | 'fill' | 'outline';
    graphQLMock: boolean;
}

export interface Lang
{
    ix: number;
    id: string;       // ISO 639-1 code
    name: string;
    icon: string;
    sort: number;
    active: boolean;
}

export interface Permission
{
    profile_id: number;
    resource_id: string;
    action_id: string;
}

export interface Profile
{
    id: number;
    name: string;
    permissions: Permission[];
}

export interface Translatable
{
    data_lang: string[];
}

export interface User
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
