import { Component, OnInit } from '@angular/core';

import { FuseConfigService } from '../../../../../core/services/config.service';

@Component({
    selector   : 'fuse-error-500',
    templateUrl: './error-500.component.html',
    styleUrls  : ['./error-500.component.scss']
})
export class FuseError500Component implements OnInit
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
