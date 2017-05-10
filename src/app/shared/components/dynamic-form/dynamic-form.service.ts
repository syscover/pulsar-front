import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class DynamicFormService {

    public form: FormGroup;

    constructor() { }
}
