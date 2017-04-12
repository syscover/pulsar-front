import { NgModule, Optional, SkipSelf } from '@angular/core';

import { ValidationMessageService } from './../core/services/validation-message.service';

import './rxjs-extensions';

@NgModule({
    imports: [ ],
    declarations:   [],
    providers:      [
        ValidationMessageService
    ],
    exports:        [],
    bootstrap:      []
})

export class CoreModule {

    constructor(
        @Optional() @SkipSelf() parentModule: CoreModule
    ) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
