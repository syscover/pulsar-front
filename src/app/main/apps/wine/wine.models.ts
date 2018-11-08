import { Attachment } from '../admin/admin.models';
import { Marketable } from '../market/market.models';

export class Appellation
{
    data_lang: string[];
    description: string;
    id: number;
    ix: number;
    lang_id: string;
    name: string;
    slug: string;
}

export class Award
{
    data_lang: string[];
    id: number;
    ix: number;
    lang_id: string;
    name: string;
    slug: string;
}

export class Family
{
    data_lang: string[];
    id: number;
    ix: number;
    lang_id: string;
    name: string;
    slug: string;
}

export class Grape
{
    data_lang: string[];
    description: string;
    id: number;
    ix: number;
    lang_id: string;
    name: string;
    slug: string;
}

export class Pairing
{
    data_lang: string[];
    id: number;
    ix: number;
    lang_id: string;
    name: string;
    slug: string;
}

export class Presentation
{
    data_lang: string[];
    id: number;
    ix: number;
    lang_id: string;
    name: string;
    slug: string;
}

export class Type
{
    data_lang: string[];
    id: number;
    ix: number;
    lang_id: string;
    name: string;
    slug: string;
}

export class Wine extends Marketable
{
    attachments: Attachment[];
    id: number;
    is_product: boolean;
    product_id: number;
    tasting_note: string;
    year: number;
}
