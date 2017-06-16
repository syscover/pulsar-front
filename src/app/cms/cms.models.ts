import { DataJson } from './../shared/classes/properties';
import { User, Attachment } from './../admin/admin.models';

export class Editor {
    id: number;
    name: string;
}

export class Family {
    id: number;
    name: string;
    editor_id: number;
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

export class Section {
    id: string;
    name: string;
    article_family_id: number;
    family: Family
}

export class Tag {
    id: number;
    lang_id: string;
    name: string;
}

export class Category {
    id: number;
    lang_id: string;
    name: string;
    slug: string;
    sort: number;
    data_lang: string;
    data: string;
}

export class Article {
    id: number;
    lang_id: string;
    parent_article_id: number;
    name: string;
    author_id: number;
    author: User;
    section_id: number;
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
    article: string;
    tags: Tag[];
    data_lang: string;
    data: DataJson;
    attachments: Attachment[];
}
