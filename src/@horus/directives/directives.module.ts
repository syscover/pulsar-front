import { NgModule } from '@angular/core';
import { NumberPipeDirective } from '@horus/directives/number-pipe.directive';

@NgModule({
    declarations: [
        NumberPipeDirective
    ],
    exports: [
        NumberPipeDirective
    ]
})
export class DirectivesModule {}
