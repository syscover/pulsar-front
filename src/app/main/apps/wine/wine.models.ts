import { Attachment } from '../admin/admin.models';
import {Marketable} from '../market/market.models';

export class Wine extends Marketable
{
    attachments: Attachment[];
    id: number;
    is_product: boolean;
    product_id: number;
    tasting_note: string;
    year: number;
}
