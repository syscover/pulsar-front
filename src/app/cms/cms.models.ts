
export class Editor {
    id: number;
    name: string;
}

export class Family {
    id: number;
    name: string;
    editor_id: number;
    file_group_id: number;
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
    author_id: number;
    section_id: number;
    family_id: number;
    status_id: number;
    publish: number;
    publish_text: string;
    date: number;
    title: string;
    slug: string;
    link: string;
    blank: boolean;
    sort: number;
    article: string;
    data_lang: string;
}
