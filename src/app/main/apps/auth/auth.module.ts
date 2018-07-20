import { NgModule } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { SharedModule } from './../../core/modules/shared.module';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    imports: [
        SharedModule,
        AuthRoutingModule
    ],
    exports: [ ],
    declarations: [
        LoginComponent
    ],
    providers: [
        
    ]
})

export class AuthModule 
{
    constructor(
        private translationLoader: FuseTranslationLoaderService
    ){
        this.translationLoader.loadTranslations(english, spanish);
    }
}
