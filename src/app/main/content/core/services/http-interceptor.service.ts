import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { environment } from './../../../../../environments/environment';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor 
{
    constructor(
        private router: Router,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    {
        // clone the request to add the new header.
        // const authReq = req.clone({ headers: req.headers.set('headerName', 'headerValue')});
        const authReq = req;

        // send the newly created request
        return next.handle(authReq)
            .do(
                evt => {
                    if (evt instanceof HttpResponse) 
                    {
                        // get authorization from header
                        const authorization = evt.headers.get('Authorization');
                        if (authorization) 
                        {
                            // apply split to get token from schema 'Bearer eyJ0eXAiOiJKV1QiL...'
                            localStorage.setItem('access_token', authorization.split(' ')[1]);
                        }
                    }
                },
                (err) => {
                    if (err instanceof HttpErrorResponse)
                    {
                        if (environment.debug) console.log('DEBUG - Error status: ' + err.status);
                        if (err.status === 401) 
                        {
                            this.router.navigate(['/apps/auth/login']);
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
