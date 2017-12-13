
export class Poll {
    id: number;
    name: string;
    email_template: string;
    default_high_score: number;
    mailing_days: number;
    expiration_days: number;
}

export class Question {
    ix: number;
    id: number;
    lang_id: string;
    poll_id: number;
    type_id: number;
    name: string;
    description: string;
    sort: number;
    high_score: number;
    data_lang: string;
}

export class QuestionType {
    id: number;
    name: string;
}

export class Review {
    id: number;
    date: any;
    poll_id: number;
    object_id: number;
    object_type: string;
    object_name: string;
    customer_id: number;
    customer_name: string;
    customer_email: string;
    email_subject: string;
    verified: boolean;
    validated: boolean;
    completed: boolean;
    average: number;
    mailing: any;
    expiration: any;
}

