import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
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
        return next
            .handle(requestWithToken)
            .pipe(
                tap(
                    evt =>
                    {
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
                    (error) =>
                    {
                        if (error instanceof HttpErrorResponse)
                        {
                            if (environment.debug) console.log('DEBUG - Error status: ' + error.status);
                            if (error.status === 401)
                            {
                                this.router.navigate(['/apps/auth/login']);
                            }
                        }
                    }
                ),
                // Log when response observable either completes or errors
                finalize(() =>
                {
                    // intercept the responds error and displace it to the console
                    // if (environment.debug) console.log('DEBUG - Error status: Error Occurred in http interceptor');
                    // return throwError('Error Occurred in http interceptor');
                })
            );
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
