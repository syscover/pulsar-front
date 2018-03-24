import { Directive, AfterViewInit, ElementRef, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators/switchMap';
import { from } from 'rxjs/observable/from';
import { map } from 'rxjs/operators/map';
import { SlugService } from './../services/slug.service';
import { environment } from './../../../../../environments/environment';

@Directive({
  selector: '[dh2Slug]'
})
export class SlugDirective implements AfterViewInit
{
    @Input('fg') fg;
    @Input('graphQL') graphQL;
    @Input('target') target = 'slug';

    constructor(
        private slugService: SlugService,
        private element: ElementRef
    ) {
    }

    ngAfterViewInit() 
    {
        Observable
            .fromEvent(this.element.nativeElement, 'keyup')
            .debounceTime(400)
            .distinctUntilChanged()
            .pipe(
                switchMap((event: any) => {
                    if (event.target.value)
                    {
                        return this.slugService.checkSlug(
                            this.graphQL.model,
                            event.target.value
                        );
                    }
                    else
                    {
                        return from([]);
                    }
                }),
                map((data: any) => {
                    return data.data;
                })
            )
            .subscribe(data => {
                if (environment.debug) console.log('DEBUG - Data from slug Query: ', data);
                
                this.fg.controls[this.target].setValue(data.slug);    
            });
    }
}
