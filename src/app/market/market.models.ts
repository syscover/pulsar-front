
export class Category {
    id: number;
    lang_id: string;
    parent: number;
    name: string;
    slug: string;
    active: boolean;
    description: string;
    data_lang: string;
    data: string;
}

export class CustomerClassTax {
    id: number;
    name: string;
}

export class ProductClassTax {
    id: number;
    name: string;
}

export class GroupCustomerClassTax {
    group_id: number;
    customer_class_tax_id: number;
}

export class OrderStatus {
    id: number;
    lang_id: string;
    name: string;
    active: boolean;
    data_lang: string;
}

export class PaymentMethod {
    id: number;
    lang_id: string;
    name: string;
    order_status_successful_id: number;
    minimum_price: number;
    maximum_price: number;
    instructions: string;
    sort: number;
    active: boolean;
    data_lang: string;
}
