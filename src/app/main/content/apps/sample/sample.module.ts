import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../core/modules/shared.module';
import { FuseSampleComponent } from './sample.component';

const routes = [
    {
        path     : 'sample',
        component: FuseSampleComponent
    }
];

@NgModule({
    declarations: [
        FuseSampleComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        SharedModule
    ],
    exports     : [
        FuseSampleComponent
    ]
})

export class FuseSampleModule
{
}
