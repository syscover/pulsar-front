import { NgModule } from '@angular/core';
import { NumberPipeDirective } from './number-pipe.directive';
import { SlugDirective } from './slug.directive';

@NgModule({
    imports: [
    ],
    exports: [
        NumberPipeDirective,
        SlugDirective,
    ],
    declarations: [
        NumberPipeDirective,
        SlugDirective
    ]
})
export class DirectivesModule
{
}
