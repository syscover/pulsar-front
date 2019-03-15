import { NgModule } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { SharedModule } from '../../core/modules/shared.module';
import { InnovaConcreteRoutingModule } from './innova-concrete-routing.module';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';

import { GroupDetailComponent } from './group/group-detail.component';
import { GroupListComponent } from './group/group-list.component';
import { TypeDetailComponent } from './type/type-detail.component';
import { TypeListComponent } from './type/type-list.component';

@NgModule({
    imports: [
        SharedModule,
        InnovaConcreteRoutingModule,
        MatPasswordStrengthModule
    ],
    exports: [ ],
    declarations: [
        GroupDetailComponent,
        GroupListComponent,
        TypeDetailComponent,
        TypeListComponent
    ],
    providers: []
})

export class InnovaConcreteModule
{
    constructor(
        private translationLoader: FuseTranslationLoaderService
    ) {
        this.translationLoader.loadTranslations(english, spanish);
    }
}
