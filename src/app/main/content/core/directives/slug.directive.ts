import { Directive, AfterViewInit, ElementRef, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators/switchMap';
import { from } from 'rxjs/observable/from';
import { map } from 'rxjs/operators/map';
import { SlugService } from './../services/slug.service';
import { environment } from './../../../../../environments/environment';

@Directive({
    selector: '[dh2Slug]',
    providers: [
        SlugService
    ]
})
export class SlugDirective implements AfterViewInit
{
    @Input('model') model;
    @Input('target') target = 'slug';

    constructor(
        private element: ElementRef,
        private control: NgControl,
        private slugService: SlugService
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
                            this.model,
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
                
                this.control.control.parent.controls[this.target].setValue(data.slug);
            });
    }
}
