import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { UpdateService } from './update.service';

@Component({
    selector: 'dh2-update',
    animations: fuseAnimations,
    template: `
        <button class="update-button"
                mat-button
                fxHide
                fxShow.gt-xs>
            <mat-icon matBadge="6"
                      matBadgePosition="after"
                      matBadgeColor="warn"
                      matBadgeSize="medium">
                cloud_download
            </mat-icon>
        </button>
    `,
    styles: [`
        .update-button {
            min-width: 64px;
            height: 64px;    
        }
    `]
})

export class UpdateComponent implements OnInit
{
    constructor(
        private _updateService: UpdateService
    ) { }

    ngOnInit(): void
    {
        this._updateService.checkUpdates();
    }
}
