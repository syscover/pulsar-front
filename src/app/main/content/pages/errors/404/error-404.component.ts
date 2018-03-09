import { Component, OnInit } from '@angular/core';

import { FuseConfigService } from '../../../../../core/services/config.service';

@Component({
    selector   : 'fuse-error-404',
    templateUrl: './error-404.component.html',
    styleUrls  : ['./error-404.component.scss']
})
export class FuseError404Component implements OnInit
{
    constructor(
        private fuseConfig: FuseConfigService
    )
    {
        this.fuseConfig.setSettings({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });
    }

    ngOnInit()
    {
    }
}
