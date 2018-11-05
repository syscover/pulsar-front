import { Lang, Country, Attachment } from './../admin/admin.models';

export class Category 
{
    ix: number;
    id: number;
    lang_id: string;
    lang: Lang;
    parent: number;
    name: string;
    slug: string;
    active: boolean;
    description: string;
    data_lang: string;
    data: string;
}

export class CustomerClassTax 
{
    id: number;
    name: string;
}

export class Marketable
{
    active: boolean;
    categories: Category[];
    cost: number;
    enable_from: any;
    enable_to: any;
    ends_at: any;
    lang: Lang;
    lang_id: string;
    limited_capacity: number;
    name: string;
    parent_id; number;
    price_type_id: number;
    product_class_tax_id: number;
    sections: Section[];
    sku: string;
    slug: string;
    sort: number;
    starts_at: any;
    subtotal: number;
    type_id: number;
    weight: number;
}

export class ProductClassTax 
{
    id: number;
    name: string;
}

export class GroupCustomerClassTax 
{
    group_id: number;
    customer_class_tax_id: number;
}

export class TaxRateZone 
{
    id: number;
    name: string;
    country_id: string;
    country: Country;
    territorial_area_1_id: string;
    territorial_area_2_id: string;
    territorial_area_3_id: string;
    zip: string;
    tax_rate: string;
}

export class TaxRule 
{
    id: number;
    name: string;
    translation: string;
    priority: number;
    sort: number;
    customer_class_taxes: CustomerClassTax[];
    product_class_taxes: ProductClassTax[];
    tax_rate_zones: TaxRateZone[];
}

export class ProductType 
{
    id: number;
    name: string;
}

export class PriceType 
{
    id: number;
    name: string;
}

export class OrderStatus 
{
    ix: number;
    id: number;
    lang_id: string;
    lang: Lang;
    name: string;
    active: boolean;
    data_lang: string;
}

export class PaymentMethod 
{
    id: number;
    lang_id: string;
    lang: Lang;
    name: string;
    order_status_successful_id: number;
    minimum_price: number;
    maximum_price: number;
    instructions: string;
    sort: number;
    active: boolean;
    data_lang: string;
}

export class Product extends Marketable
{
    attachments: Attachment[];
    data: string;
    data_lang: string;
    description: string;
    field_group_id: number;
    id: number;
}

export class Section
{
    ix: number;
    id: string;
    name: string;
}

export class Warehouse 
{
    id: number;
    name: string;

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

    active: boolean;
}

export class Stock 
{
    id: number;
    warehouse_id: number;
    product_id: number;
    stock: number;
    minimum_stock: number;
}

export class Order 
{
    id: number;
    date: any;
    payment_method_id: number;
    tracking_id: string;
    status_id: number;
    rows: OrderRow[];
    discounts: CustomerDiscountHistory[];
    ip: string;
    data: string;
    comments: string;
    transaction_id: string;
    discount_amount: number;
    subtotal_with_discounts: number;
    tax_amount: number;
    cart_items_total_without_discounts: number;
    subtotal: number;
    shipping_amount: number;
    total: number;
    has_gift: boolean;
    gift_from: string;
    gift_to: string;
    gift_message: string;
    customer_id: number;
    customer_group_id: number;
    customer_company: string;
    customer_tin: string;
    customer_name: string;
    customer_surname: string;
    customer_email: string;
    customer_mobile: string;
    customer_phone: string;
    has_invoice: boolean;
    invoiced: boolean;
    invoice_number: string;
    invoice_company: string;
    invoice_tin: string;
    invoice_name: string;
    invoice_surname: string;
    invoice_email: string;
    invoice_mobile: string;
    invoice_phone: string;
    invoice_country_id: string;
    invoice_territorial_area_1_id: string;
    invoice_territorial_area_2_id: string;
    invoice_territorial_area_3_id: string;
    invoice_zip: string;
    invoice_locality: string;
    invoice_address: string;
    invoice_latitude: string;
    invoice_longitude: string;
    invoice_comments: string;
    has_shipping: boolean;
    shipping_company: string;
    shipping_name: string;
    shipping_surname: string;
    shipping_email: string;
    shipping_mobile: string;
    shipping_phone: string;
    shipping_country_id: string;
    shipping_territorial_area_1_id: string;
    shipping_territorial_area_2_id: string;
    shipping_territorial_area_3_id: string;
    shipping_zip: string;
    shipping_locality: string;
    shipping_address: string;
    shipping_latitude: string;
    shipping_longitude: string;
    shipping_comments: string;
}

export class OrderRow 
{
    id: number;
    lang_id: string;
    order_id: number;
    product_id: number;
    name: string;
    description: string;
    data: string;
    cost: number;
    total_cost: number;
    price: number;
    quantity: number;
    subtotal: number;
    total_without_discounts: number;
    discount_subtotal_percentage:  number;
    discount_total_percentage:  number;
    discount_subtotal_percentage_amount:  number;
    discount_total_percentage_amount:  number;
    discount_subtotal_fixed_amount:  number;
    discount_total_fixed_amount:  number;
    discount_amount:  number;
    subtotal_with_discounts: number;
    tax_rules: string;
    tax_amount: number;
    total: number;
    has_gift: boolean;
    gift_from: string;
    gift_to: string;
    gift_message: string;
    gift_comments: string;
}

export class DiscountType 
{
    id: number;
    name: string;
}

export class CartPriceRurle 
{
    id: number;
    names: string;
    descriptions: string;
    active: boolean;
    customer_group_ids: string;
    customer_ids: string;
    combinable: boolean;
    priority: number;
    has_coupon: boolean;
    coupon_code: string;
    coupon_uses: number;
    customer_uses: number;
    total_uses: number;
    enable_from: any;
    enable_to: any;
    condition_rules: string;
    discount_type_id: number;
    discount_fixed_amount: number;
    discount_percentage: number;
    maximum_discount_amount: number;
    apply_shipping_amount: boolean;
    free_shipping: boolean;
    product_rules: string;
    data_lang: string;
}

export class CustomerDiscountHistory
{
    id: number;
    customer_id: number;
    order_id: number;
    applied: boolean;
    rule_type: string;
    rule_id: number;
    names: string;
    descriptions: string;
    has_coupon: boolean;
    coupon_code: string;
    discount_type_id: number;
    discount_fixed_amount: number;
    discount_percentage: number;
    maximum_discount_amount: number;
    apply_shipping_amount: boolean;
    free_shipping: boolean;
    discount_amount: number;
    data_lang: string;
    price_rule: string;
}

export class Log {
    time: any;
    message: string;
    status_id: number;
}