import { Injectable, Injector } from '@angular/core';
import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class AttachmentFamilyService extends CoreService {

    constructor(
        protected injector: Injector
    ) {
        super(injector);

        this.setBaseUri(`/${this.appRootPrefix}/admin/attachment-family`); // set application URL
        this.setApiUrl('/api/v1/admin/attachment-family'); // set api URL
    }
}
