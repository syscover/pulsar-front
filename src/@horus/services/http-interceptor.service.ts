import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { environment } from 'environments/environment';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor 
{
    constructor(
        private router: Router,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    {
        // clone the request to add the new header.
        // const authReq = req.clone({ headers: req.headers.set('headerName', 'headerValue')});

        const requestWithToken = this.addToken(request);

        // send the newly created request
        return next.handle(requestWithToken)
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
                return throwError(error);
            }) as any;
    }

    // https://github.com/auth0/angular2-jwt/issues/504
    // resolve issue of whitelistedDomains auth0/angular2-jwt 1.1.0
    private addToken(request: HttpRequest<any>): HttpRequest<any>
    {
        const token = localStorage.getItem('access_token');
        let clone: HttpRequest<any>;

        if (token) 
        {
            clone = request.clone({
                setHeaders: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
        } 
        else 
        {
            clone = request.clone({
                setHeaders: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
        }

        return clone;
    }
}
