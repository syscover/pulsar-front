import { Injectable, Inject, Optional } from '@angular/core';
import { MapsAPILoader, LAZY_MAPS_API_CONFIG, LazyMapsAPILoaderConfigLiteral, GoogleMapsScriptProtocol } from '@agm/core';
import { DocumentRef, WindowRef } from '@agm/core/utils/browser-globals';
import { ConfigService } from './config.service';

@Injectable()
export class GoogleMapsLoaderService extends MapsAPILoader
{
    protected _scriptLoadingPromise: Promise<void>;
    protected _config: LazyMapsAPILoaderConfigLiteral;
    protected _windowRef: WindowRef;
    protected _documentRef: DocumentRef;
    protected readonly _SCRIPT_ID: string = 'agmGoogleMapsApiScript';
    protected readonly callbackName: string = `agmLazyMapsAPILoader`;

    constructor(
        @Optional() @Inject(LAZY_MAPS_API_CONFIG) config: any = null,
        w: WindowRef,
        d: DocumentRef,
        private configService: ConfigService,
    )
    {
        super();
        this._config = config || {};
        this._windowRef = w;
        this._documentRef = d;
    }

    load(): Promise<void>
    {
        const window = <any>this._windowRef.getNativeWindow();
        if (window.google && window.google.maps) {
            // Google maps already loaded on the page.
            return Promise.resolve();
        }

        if (this._scriptLoadingPromise) {
            return this._scriptLoadingPromise;
        }

        // this can happen in HMR situations or Stackblitz.io editors.
        const scriptOnPage = this._documentRef.getNativeDocument().getElementById(this._SCRIPT_ID);
        if (scriptOnPage) {
            this._assignScriptLoadingPromise(scriptOnPage);
            return this._scriptLoadingPromise;
        }

        this._config.apiKey = this.configService.get('googleMapsApiKey');

        const script = this._documentRef.getNativeDocument().createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        script.id = this._SCRIPT_ID;
        script.src = this._getScriptSrc(this.callbackName);
        this._assignScriptLoadingPromise(script);
        this._documentRef.getNativeDocument().body.appendChild(script);
        return this._scriptLoadingPromise;
    }

    private _assignScriptLoadingPromise(scriptElem: HTMLElement)
    {
        this._scriptLoadingPromise = new Promise<void>((resolve: Function, reject: Function) => {
            (<any>this._windowRef.getNativeWindow())[this.callbackName] = () => {
                resolve();
            };

            scriptElem.onerror = (error: Event) => {
                reject(error);
            };
        });
    }

    protected _getScriptSrc(callbackName: string): string
    {
        let protocolType: GoogleMapsScriptProtocol =
            (this._config && this._config.protocol) || GoogleMapsScriptProtocol.HTTPS;
        let protocol: string;

        switch (protocolType) {
            case GoogleMapsScriptProtocol.AUTO:
                protocol = '';
                break;
            case GoogleMapsScriptProtocol.HTTP:
                protocol = 'http:';
                break;
            case GoogleMapsScriptProtocol.HTTPS:
                protocol = 'https:';
                break;
        }

        const hostAndPath: string = this._config.hostAndPath || 'maps.googleapis.com/maps/api/js';
        const queryParams: {[key: string]: string | Array<string>} = {
            v: this._config.apiVersion || '3',
            callback: callbackName,
            key: this._config.apiKey,
            client: this._config.clientId,
            channel: this._config.channel,
            libraries: this._config.libraries,
            region: this._config.region,
            language: this._config.language
        };
        const params: string = Object.keys(queryParams)
            .filter((k: string) => queryParams[k] != null)
            .filter((k: string) => {
                // remove empty arrays
                return !Array.isArray(queryParams[k]) ||
                    (Array.isArray(queryParams[k]) && queryParams[k].length > 0);
            })
            .map((k: string) => {
                // join arrays as comma seperated strings
                let i = queryParams[k];
                if (Array.isArray(i)) {
                    return {key: k, value: i.join(',')};
                }
                return {key: k, value: queryParams[k]};
            })
            .map((entry: {key: string, value: string}) => {
                return `${entry.key}=${entry.value}`;
            })
            .join('&');
        return `${protocol}//${hostAndPath}?${params}`;
    }
}
