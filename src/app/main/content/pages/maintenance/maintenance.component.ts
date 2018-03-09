import { Component, OnInit } from '@angular/core';

import { FuseConfigService } from '../../../../core/services/config.service';
import { fuseAnimations } from '../../../../core/animations';

@Component({
    selector   : 'fuse-maintenance',
    templateUrl: './maintenance.component.html',
    styleUrls  : ['./maintenance.component.scss'],
    animations : fuseAnimations
})
export class FuseMaintenanceComponent implements OnInit
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
