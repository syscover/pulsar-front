import { Injectable } from '@angular/core';
import { Request, Response, XHRBackend, XHRConnection } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InterceptorXHRBackend extends XHRBackend {

    createConnection(request: Request): XHRConnection {
        let connection: XHRConnection = super.createConnection(request);
        connection.response = connection.response.do(this.processResponse);
        return connection;
    }

    processResponse(response: Response) {
        let authorization = response.headers.get('Authorization');

        if (authorization) {
            let token = authorization.split(' ');
            localStorage.setItem('id_token', token[1]);
        }

        return Observable.of(response);
    }
}
