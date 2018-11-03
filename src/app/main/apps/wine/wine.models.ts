import { Attachment } from '../admin/admin.models';

export class Wine
{
    attachments: Attachment[];
    id: number;
    is_product: boolean;
    name: string;
    product_id: number;
    slug: string;
    tasting_note: string;
    year: number;
}
