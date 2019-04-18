export class Poll 
{
    id: number;
    name: string;
    email_template: string;
    send_notification: boolean;
    validate: boolean;
    default_high_score: number;
    mailing_days: number;
    expiration_days: number;
    questions: Question[];
}

export class Question 
{
    ix: number;
    id: number;
    lang_id: number;
    poll_id: number;
    type_id: number;
    name: string;
    description: string;
    sort: number;
    high_score: number;
    data_lang: string[];
    average: QuestionAverage;
}

export class Response 
{
    id: number;
    review_id: number;
    question_id: number;
    score: number;
    text: string;
}

export class QuestionType 
{
    id: number;
    name: string;
}

export class Review 
{
    id: number;
    date: any;
    poll_id: number;
    poll: Poll;
    object_id: number;
    object_type: string;
    object_name: string;
    object_email: string;
    customer_id: number;
    customer_name: string;
    customer_email: string;
    email_subject: string;
    verified: boolean;
    validated: boolean;
    completed: boolean;
    average: number;
    mailing: any;
    sent: boolean;
    expiration: any;
    comments: Comment[];
    responses: Response[];
}

export class ObjectAverage 
{
    id: number;
    poll_id: number;
    poll: Poll;
    object_id: number;
    object_type: string;
    object_name: string;
    reviews: number;
    total: number;
    average: number;
    fake_average: number;
}

export class QuestionAverage 
{
    id: number;
    reviews: number;
    total: number;
    average: number;
}

export class Comment 
{
    id: number;
    review_id: number;
    review: Review;
    date: any;
    owner_type_id: number;
    name: string;
    email: string;
    comment: string;
    validated: boolean;
}
