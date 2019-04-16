import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'dh2-dashboard',
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit
{
    constructor(
        private _translateService: TranslateService,
    )
    {}

    ngOnInit(): void
    {
        // set translation service after login
        this._translateService.setDefaultLang('en');
        this._translateService.setDefaultLang('es');
    }
}
