import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { TopbarComponent } from './topbar/topbar.component';
import { ProfileComponent } from './profile/profile.component';
import { MenuComponent, SubMenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { CoreService } from './../shared/super/core.service';
import { GrowlModule } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';

@NgModule({
    imports: [
        CommonModule,
        GrowlModule,
        MainRoutingModule
    ],
    declarations: [
        MainComponent,
        TopbarComponent,
        ProfileComponent,
        MenuComponent,
        SubMenuComponent,
        FooterComponent
    ],
    providers: [
        CoreService,
        MessageService
    ],
    exports: [
        CommonModule,
        MainComponent,
        TopbarComponent,
        ProfileComponent,
        MenuComponent,
        SubMenuComponent,
        FooterComponent
    ]
})

export class MainModule {
    constructor() {}
}
