import { NgModule } from '@angular/core';
import { SlugDirective } from '@horus/components/slug/slug.directive';
import { SlugService } from '@horus/components/slug/slug.service';

@NgModule({
    declarations: [
        SlugDirective
    ],
    exports: [
        SlugDirective
    ],
    providers: [
        SlugService
    ]
})
export class SlugModule {}
