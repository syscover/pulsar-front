import { User, Attachment } from './../admin/admin.models';

export class Editor 
{
    id: number;
    name: string;
}

export class Status 
{
    id: number;
    name: string;
}

export class Family 
{
    id: number;
    name: string;
    excerpt_editor_id: number;
    article_editor_id: number;
    field_group_id: number;
    date: boolean;
    title: boolean;
    slug: boolean;
    link: boolean;
    categories: boolean;
    sort: boolean;
    tags: boolean;
    article_parent: boolean;
    attachments: boolean;
}

export class Section 
{
    ix: number;
    id: string;
    name: string;
    family_id: number;
    family: Family;
    attachment_families: number[];
}

export class Tag 
{
    id: number;
    lang_id: string;
    name: string;
}

export class Category 
{
    ix: number;
    id: number;
    lang_id: string;
    name: string;
    slug: string;
    section_id: number;
    sort: number;
    data_lang: string[];
    data: Object;
}

export class Article 
{
    ix: number;
    id: number;
    lang_id: string;
    parent_id: number;
    name: string;
    author_id: number;
    author: User;
    section_id: string;
    family_id: number;
    family: Family;
    status_id: number;
    publish: any;
    date: any;
    title: string;
    slug: string;
    categories: Category[];
    link: string;
    blank: boolean;
    sort: number;
    excerpt: string;
    article: string;
    tags: Tag[];
    data_lang: string[];
    data: any;
    attachments: Attachment[];
    created_at: any;
}
