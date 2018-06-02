import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';

import { locale as navigationEnglish } from './navigation/i18n/en';
import { locale as navigationSpanish } from './navigation/i18n/es';

@Component({
    selector   : 'fuse-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    constructor(
        private translate: TranslateService,
        private fuseNavigationService: FuseNavigationService,
        private fuseSplashScreen: FuseSplashScreenService,
        private fuseTranslationLoader: FuseTranslationLoaderService
    )
    {
        // Add languages
        this.translate.addLangs(['en', 'es']);

        // Set the default language
        this.translate.setDefaultLang('es');

        // Set the navigation translations
        this.fuseTranslationLoader.loadTranslations(navigationEnglish, navigationSpanish);

        // Use a language
        this.translate.use('es');
    }
}
