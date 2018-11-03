import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './../../services/http.service';
import { environment } from 'environments/environment';
import gql from 'graphql-tag';

@Injectable()
export class AttachmentsService extends HttpService
{
    constructor(
        protected injector: Injector
    ) {
        super(injector);
        this.setEndpoint('/api/v1/admin/attachment-upload'); // set api URL
    }

    setCropImage(parameters): Observable<any> 
    {
        if (environment.debug) console.log('DEBUG - Crop image with parameters: ', parameters);

        return this
            .apolloClient()
            .mutate({
                mutation: gql`
                    mutation AdminCropAttachment ($payload:Object!) {
                        adminCropAttachment (payload:$payload)
                    }`,
                variables: {
                    payload: parameters // add object to arguments
                }
            });
    }

    deleteAttachment(attachment): Observable<any> 
    {
        if (environment.debug) console.log('DEBUG - Trigger delete attachment: ', attachment);

        return this
            .apolloClient()
            .mutate({
                mutation: gql`
                    mutation AdminDeleteAttachment ($attachment:AdminAttachmentInput!) {
                        adminDeleteAttachment (attachment:$attachment)
                    }`,
                variables: {
                    attachment: attachment
                }
            });
    }
}
