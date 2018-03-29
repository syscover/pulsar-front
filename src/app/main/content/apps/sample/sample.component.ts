import { Component } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../../../@fuse/services/translation-loader.service';

import { Validators } from '@angular/forms';
import { fuseAnimations } from './../../../../../@fuse/animations';
import * as _ from 'lodash';
import { MatDatepicker } from '@angular/material';

import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

@Component({
    selector   : 'fuse-sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss'],
    animations: fuseAnimations
})
export class FuseSampleComponent
{
    constructor(private translationLoader: FuseTranslationLoaderService)
    {
        this.translationLoader.loadTranslations(english, spanish);
    }
}
