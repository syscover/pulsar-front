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
    composition: CompositionGrape;
}
export class CompositionGrape
{
    percentage: number; // property for relation between grape and wine
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
    abv: number;
    appellation_id: number;
    attachments: Attachment[];
    country_id: string;
    data: object;
    data_lang: string[];
    decanter: number;
    family_id: number;
    id: number;
    is_product: boolean;
    ix: number;
    lang_id: string;
    name: string;
    parker: number;
    penin: number;
    presentation_id: number;
    product_id: number;
    production: string;
    score_average: number;
    suckling: number;
    tasting: number;
    tasting_look: string;
    tasting_nose: string;
    tasting_mouth: string;
    tasting_temperature: string;
    tasting_consumption: string;
    territorial_area_1_id: string;
    territorial_area_2_id: string;
    territorial_area_3_id: string;
    type_id: number;
    vineyard: string;
    vineyard_name: string;
    vineyard_area: string;
    vineyard_description: string;
    vineyard_age: string;
    vineyard_soil: string;
    vineyard_weather: string;
    vineyard_performance: string;
    vineyard_vintage: string;
    vineyard_vinification: string;
    vineyard_aging: string;
    vineyard_bottling: string;
    vintage: number;
    wine_spectator: number;
    winery_id: number;
}

export class Winery
{
    attachments: Attachment[];
    country_id: string;
    data: object;
    data_lang: string[];
    description: string;
    excerpt: string;
    header: string;
    id: number;
    ix: number;
    lang_id: string;
    name: string;
    slug: string;
}
