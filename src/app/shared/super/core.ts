import * as appGlobals from './../../core/app-globals';

export class Core {
    protected appGlobals: any = appGlobals;
    protected appRootPrefix: string = appGlobals.appRootPrefix;
    protected apiUrlPrefix: string = appGlobals.apiUrlPrefix;

    constructor() {}
}
