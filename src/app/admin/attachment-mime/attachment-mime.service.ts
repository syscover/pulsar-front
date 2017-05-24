import { Injectable, Injector } from '@angular/core';

import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class AttachmentMimeService extends CoreService {

    constructor(
        protected injector: Injector
    ) {
        super(injector);

        this.setBaseUri(`/${this.appRootPrefix}/admin/attachment-mime`); // set application URL
        this.setApiUrl('/api/v1/admin/attachment-mime'); // set api URL
    }
}