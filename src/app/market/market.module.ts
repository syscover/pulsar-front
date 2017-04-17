import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { MarketRoutingModule } from './market-routing.module';

import { CategoryListComponent } from './categories/category-list.component';
import { CategoryDetailComponent } from './categories/category-detail.component';

import { CategoryService } from './categories/category.service';

@NgModule({
    imports: [
        SharedModule,
        MarketRoutingModule
    ],
    declarations: [
        CategoryListComponent,
        CategoryDetailComponent
    ],
    providers: [
        CategoryService
    ]
})

export class MarketModule {
    constructor() {}
}
