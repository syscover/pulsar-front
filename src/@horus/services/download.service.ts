import { Injectable } from '@angular/core';
import { HttpService } from '@horus/services/http.service';
import { DomSanitizer } from '@angular/platform-browser';
import { File } from '@horus/types';
import { environment } from 'environments/environment';

@Injectable()
export class DownloadService
{
    constructor(
        private _http: HttpService,
        private _sanitizer: DomSanitizer
    ) 
    {}

    public download(file: File, callback: Function = () => {}): void
    {
        this._http
            .httpClient()
            .post(this._http.restUrl + '/api/v1/admin/file-manager/read', 
                {
                    file
                },
                {
                    responseType: 'blob' // set data type that will go to get
                }
            )
            .subscribe((data) =>
            {
                const blob = new Blob([data], { type: file.mime });

                // IE doesn't allow using a blob object directly as link href
                // instead it is necessary to use msSaveOrOpenBlob
                if (window.navigator && window.navigator.msSaveOrOpenBlob)
                {
                    window.navigator.msSaveOrOpenBlob(blob);
                    
                    // callback after finish download
                    callback();
                    return;
                }

                const fileUrl = this._sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
                
                if (environment.debug) console.log('DEBUG - response file url to download: ', fileUrl);

                const link = document.createElement('a');
                link.href = fileUrl['changingThisBreaksApplicationSecurity'];
                link.download = file.filename;

                // this is necessary as link.click() does not work on the latest firefox
                link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

                setTimeout(() => 
                {
                    // For Firefox it is necessary to delay revoking the ObjectURL
                    window.URL.revokeObjectURL(fileUrl['changingThisBreaksApplicationSecurity']);
                    link.remove();

                    // callback after finish download
                    callback();

                }, 100);
            });
    }
}
