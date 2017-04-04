import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';
import { CheckLangsObjectPipe } from './pipes/check-langs-object.pipe';
import { ActionLangObjectPipe } from './pipes/action-lang-object.pipe';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule
    ],
    declarations: [
        MainLayoutComponent,
        SideNavbarComponent,
        TopNavbarComponent,
        CheckLangsObjectPipe,
        ActionLangObjectPipe
    ],
    providers: [
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        MainLayoutComponent,
        CheckLangsObjectPipe,
        ActionLangObjectPipe
    ]
})

export class ShareModule { }
