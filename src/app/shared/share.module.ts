import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { DataContainerComponent } from './components/data-container/data-container.component';
import { CheckLangsObjectPipe } from './pipes/check-langs-object.pipe';
import { ActionLangObjectPipe } from './pipes/action-lang-object.pipe';
import { PrimeNgModule } from './modules/prime-ng.module';
import { ProfileComponent } from './components/profile/profile.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { MenuComponent, SubMenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        PrimeNgModule
    ],
    declarations: [
        MainLayoutComponent,
        DataContainerComponent,
        TopbarComponent,
        CheckLangsObjectPipe,
        ActionLangObjectPipe,
        MenuComponent,
        SubMenuComponent,
        ProfileComponent,
        FooterComponent
    ],
    providers: [
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        PrimeNgModule,
        MainLayoutComponent,
        DataContainerComponent,
        CheckLangsObjectPipe,
        ActionLangObjectPipe
    ]
})

export class ShareModule { }
