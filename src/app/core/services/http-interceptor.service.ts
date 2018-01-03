import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // clone the request to add the new header.
        // const authReq = req.clone({ headers: req.headers.set('headerName', 'headerValue')});
        const authReq = req;

        // send the newly created request
        return next.handle(authReq)
            .do(
                evt => {
                    if (evt instanceof HttpResponse) {
                        // get authorization from header
                        const authorization = evt.headers.get('Authorization');
                        if (authorization) {
                            // apply split to get token from schema 'Bearer eyJ0eXAiOiJKV1QiL...'
                            localStorage.setItem('access_token', authorization.split(' ')[1]);
                        }
                    }
                },
                (err) => {
                    if (err instanceof HttpErrorResponse) {
                        console.log('Error: ' + err.status );
                        if (err.status === 401) {
                            // this.document.location.href = `${this.document.location.protocol}//${this.document.location.hostname}:${this.document.location.port}/login`;
                        }
                    }
                }
            )
            .catch((error, caught) => {
                // intercept the respons error and displace it to the console
                console.log('Error Occurred');
                console.log(error);

                // return the error to the method that called it
                return Observable.throw(error);
            }) as any;
    }
}
