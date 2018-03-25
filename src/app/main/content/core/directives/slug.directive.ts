import { Directive, AfterViewInit, ElementRef, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { switchMap } from 'rxjs/operators/switchMap';
import { merge } from 'rxjs/observable/merge';
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

    run = false;
    // buffer: string;
    // bufferManager = new Subject();

    constructor(
        private element: ElementRef,
        private control: NgControl,
        private slugService: SlugService
    ) {
    }

    async ngAfterViewInit() 
    {
        const response = 
            merge(
                Observable
                .fromEvent(this.element.nativeElement, 'keyup')
                .debounceTime(400)
                .distinctUntilChanged() // ,
                // this.manageBuffer
            )
            .pipe(
                switchMap(async (event: any) => {

                    if (event.target.value && ! this.run) 
                    {
                        this.run = true;
                        const data = await this.slugService.checkSlug(
                            this.model,
                            event.target.value
                        );
                        this.run = false;

                        return data;
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
                if (data) this.control.control.parent.controls[this.target].setValue(data.slug);
            });
    }
}
