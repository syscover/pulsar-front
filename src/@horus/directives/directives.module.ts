import { NgModule } from '@angular/core';
import { NumberPipeDirective } from './number-pipe.directive';

@NgModule({
    declarations: [
        NumberPipeDirective
    ],
    exports: [
        NumberPipeDirective
    ]
})
export class DirectivesModule {}
