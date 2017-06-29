import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { TopbarComponent } from './topbar/topbar.component';
import { ProfileComponent } from './profile/profile.component';
import { MenuComponent, SubMenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { CoreService } from './../shared/super/core.service';

@NgModule({
    imports: [
        CommonModule,
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
        CoreService
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
