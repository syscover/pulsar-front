export class UploadAdapter 
{
    loader;
    xhr: XMLHttpRequest;
    url: string;

    constructor(loader, url) 
    {
        this.loader = loader;
        this.url = url;
    }

    upload() 
    {
        return this.loader.file
            .then( file => new Promise((resolve, reject) => 
            {
                this._initRequest();
                this._initListeners(resolve, reject, file);
                this._sendRequest(file);
            }));
    }

    abort() 
    {
        console.log('UploadAdapter abort');
    }

    // Initializes the XMLHttpRequest object using the URL passed to the constructor.
    private _initRequest() 
    {
        this.xhr = new XMLHttpRequest();

        // Note that your request may look different. It is up to you and your editor
        // integration to choose the right communication channel. This example uses
        // a POST request with JSON as a data structure but your configuration
        // could be different.
        this.xhr.open( 'POST', this.url, true );
        this.xhr.responseType = 'json';
    }

    // Initializes XMLHttpRequest listeners.
    private _initListeners( resolve, reject, file ) 
    {
        const loader = this.loader;
        const genericErrorText = `Couldn't upload file: ${ file.name }.`;

        this.xhr.addEventListener( 'error', () => reject( genericErrorText ) );
        this.xhr.addEventListener( 'abort', () => reject() );
        this.xhr.addEventListener( 'load', ($event) => 
        {
            const response = this.xhr.response;
            
            // This example assumes the XHR server's "response" object will come with
            // an "error" which has its own "message" that can be passed to reject()
            // in the upload promise.
            //
            // Your integration may handle upload errors in a different way so make sure
            // it is done properly. The reject() function must be called when the upload fails.
            if ( !response || response.error ) 
            {
                return reject( response && response.error ? response.error.message : genericErrorText );
            }

            // If the upload is successful, resolve the upload promise with an object containing
            // at least the "default" URL, pointing to the image on the server.
            // This URL will be used to display the image in the content. Learn more in the
            // UploadAdapter#upload documentation.
            resolve( {
                default: response.link
            });
        });

        // Upload progress when it is supported. The file loader has the #uploadTotal and #uploaded
        // properties which are used e.g. to display the upload progress bar in the editor
        // user interface.
        if ( this.xhr.upload ) 
        {
            this.xhr.upload.addEventListener( 'progress', evt => 
            {
                if ( evt.lengthComputable ) 
                {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            });
        }
    }

    // Prepares the data and sends the request.
    private _sendRequest( file ) 
    {
        // Prepare the form data.
        const data = new FormData();

        data.append( 'file', file );

        // Important note: This is the right place to implement security mechanisms
        // like authentication and CSRF protection. For instance, you can use
        // XMLHttpRequest.setRequestHeader() to set the request headers containing
        // the CSRF token generated earlier by your application.

        // Send the request.
        this.xhr.send( data );
    }
}