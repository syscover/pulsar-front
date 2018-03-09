import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatPaginatorIntl } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { AuthorizationService } from './../core/services/authorization.service';
import { FuseTranslationLoaderService } from './../../../core/services/translation-loader.service';
import { CustomMatPaginatorIntlService } from './../core/services/custom-mat-paginator-int.service';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

const routes = [
    {
        path        : 'sample',
        loadChildren: './sample/sample.module#FuseSampleModule'
    },
    {
        path        : 'auth',
        loadChildren: './auth/auth.module#AuthModule',
    },
    {
        path        : 'admin',
        loadChildren: './admin/admin.module#AdminModule',
        canLoad     : [AuthorizationService]
    },
    /* {
        path        : 'mail',
        loadChildren: './mail/mail.module#FuseMailModule'
    },
    {
        path        : 'mail-ngrx',
        loadChildren: './mail-ngrx/mail.module#FuseMailNgrxModule'
    },
    {
        path        : 'chat',
        loadChildren: './chat/chat.module#FuseChatModule'
    },
    {
        path        : 'calendar',
        loadChildren: './calendar/calendar.module#FuseCalendarModule'
    },
    {
        path        : 'e-commerce',
        loadChildren: './e-commerce/e-commerce.module#FuseEcommerceModule'
    },
    {
        path        : 'academy',
        loadChildren: './academy/academy.module#FuseAcademyModule'
    },
    {
        path        : 'todo',
        loadChildren: './todo/todo.module#FuseTodoModule'
    },
    {
        path        : 'file-manager',
        loadChildren: './file-manager/file-manager.module#FuseFileManagerModule'
    },
    {
        path        : 'contacts',
        loadChildren: './contacts/contacts.module#FuseContactsModule'
    },
    {
        path        : 'scrumboard',
        loadChildren: './scrumboard/scrumboard.module#FuseScrumboardModule'
    } */
];


@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [],
    providers: [{
        provide: MatPaginatorIntl, 
        useClass: CustomMatPaginatorIntlService
    }]
})
export class AppsModule
{
    constructor(
        private translate: TranslateService,
        private translationLoader: FuseTranslationLoaderService
    ){
        this.translationLoader.loadTranslations(english, spanish);
    }
}
