
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
    high_score: number;
    data_lang: string;
}

export class QuestionType {
    id: number;
    name: string;
}

