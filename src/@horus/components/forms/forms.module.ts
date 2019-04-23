import { NgModule } from '@angular/core';

import { InputModule } from '@horus/components/forms/input/input.module';

@NgModule({
    imports: [
        InputModule
    ],
    exports: [
        InputModule
    ]
})
export class FormsModule {}
