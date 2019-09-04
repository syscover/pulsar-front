import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { AuthenticationService } from './authentication.service';
import { AdditionalField } from '@horus/types';
import { Subject, Observable } from 'rxjs';


@Injectable()
export class UploadService
{
    onFinish = new Subject();

    constructor(
        private _authenticationService: AuthenticationService
    ) {}

    public uploadFile(endPoint: string, file: File, additionalFields: AdditionalField[] = [], callback: Function = () => {}): Observable<any>
    {
        const xhr       = new XMLHttpRequest();
        const formData  = new FormData(); // create forma data to add files and inputs

        // this.onBeforeUpload.emit({
        //    'xhr': xhr,
        //    'formData': formData
        // });

        // add files to formData to send to server
        formData.append('files[]', file, file.name);
        if (environment.debug) console.log('DEBUG - append file: ', file);

        additionalFields.forEach((field) => 
        {
            formData.append(field.name, field.value);
        });

        // progress var
        /*xhr.upload.addEventListener('progress', (e: ProgressEvent) => {
            if (e.lengthComputable) {
            this.progress = Math.round((e.loaded * 100) / e.total);
            }
        }, false);*/

        // set function  onreadystatechange that will be called
        xhr.onreadystatechange = () => 
        {
            if (xhr.readyState === 4) 
            {
                // this.progress = 0;

                if (xhr.status >= 200 && xhr.status < 300) 
                {
                    this.onFinish.next(JSON.parse(xhr.response));
                } 
                else 
                {
                    // this.onError.emit({xhr: xhr, files: this.files});
                }

                // when finish xhr request, empty files array for the following uploads
                // this.files = [];
            }
        };

        const authToken = this._authenticationService.getAuthToken();

        xhr.open('POST', endPoint, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Authorization', `Bearer ${authToken['accessToken']}`);
        // xhr.withCredentials = this.withCredentials;
        xhr.send(formData);

        return this.onFinish;
    }
}