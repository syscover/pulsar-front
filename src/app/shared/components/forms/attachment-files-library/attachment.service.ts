import { Injectable, Injector } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JsonResponse } from './../../../classes/json-respose';
import { CoreService } from './../../../super/core.service';
import { environment } from './../../../../../environments/environment';
import gql from 'graphql-tag';

@Injectable()
export class AttachmentService extends CoreService {

    constructor(
        protected injector: Injector
    ) {
        super(injector);
        this.setEndpoint('/api/v1/admin/attachment-upload'); // set api URL
    }

    setCropImage(parameters): Observable<any> {

        if(environment.debug) console.log('DEBUG - Crop image with paremameters: ', parameters);

        let args = {}; // arguments for observable
        args['object'] = parameters; // add object to arguments

         return this.proxyGraphQL()
            .mutate({
                mutation: gql`
                    mutation AdminCropAttachment ($object:Object!) {
                        adminCropAttachment (object:$object)
                    }`,
                variables: args
            });
    }

    deleteAttachment(attachment): Observable<any> {

        if (environment.debug) console.log('DEBUG - Trigger delete attachment: ', attachment);

        let args = {}; // arguments for observable
        args['attachment'] = attachment; // add object to arguments

        return this.proxyGraphQL()
            .mutate({
                mutation: gql`
                    mutation AdminDeleteAttachment ($attachment:AdminAttachmentInput!) {
                        adminDeleteAttachment (attachment:$attachment)
                    }`,
                variables: args
            });
    }
}
