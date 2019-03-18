import { NgModule } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { SharedModule } from '../../core/modules/shared.module';
import { InnovaConcreteRoutingModule } from './innova-concrete-routing.module';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';

import { CharacteristicDetailComponent } from './characteristic/characteristic-detail.component';
import { CharacteristicListComponent } from './characteristic/characteristic-list.component';
import { GroupDetailComponent } from './group/group-detail.component';
import { GroupListComponent } from './group/group-list.component';
import { MonumentDetailComponent } from './monument/monument-detail.component';
import { MonumentListComponent } from './monument/monument-list.component';
import { PeopleDetailComponent } from './people/people-detail.component';
import { PeopleListComponent } from './people/people-list.component';
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
        CharacteristicDetailComponent,
        CharacteristicListComponent,
        GroupDetailComponent,
        GroupListComponent,
        PeopleDetailComponent,
        PeopleListComponent,
        MonumentDetailComponent,
        MonumentListComponent,
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
