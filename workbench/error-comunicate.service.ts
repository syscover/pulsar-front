import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ErrorComunicateService {

    // Observable string sources
    private parentComunicateSource = new Subject<FormGroup>();
    private childrenComunicateSource = new Subject<FormGroup>();

    parentComunicate$ = this.parentComunicateSource.asObservable();
    childrenComunicate$ = this.childrenComunicateSource.asObservable();

}
