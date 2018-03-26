import { Directive, AfterViewInit, ElementRef, Input, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
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
export class SlugDirective implements AfterViewInit, OnDestroy
{
    @Input('model') model;
    @Input('target') target = 'slug';

    private ngUnsubscribe = new Subject();
    private running = false; // boolean true when is consulting through Http
    private buffer: any;

    constructor(
        private element: ElementRef,
        private control: NgControl,
        private slugService: SlugService
    ) { }

    ngAfterViewInit() 
    {
        Observable
            .fromEvent(this.element.nativeElement, 'keyup')
            .debounceTime(400)
            .distinctUntilChanged()
            .pipe(
                switchMap(async (event: any) => {
                    // check if there ara value and there isn't a request in progress
                    if (event.target.value && ! this.running) 
                    {
                        this.running = true;
                        let data;
                        data = await this.slugService.checkSlug(
                            this.model,
                            event.target.value
                        );

                        // check buffer
                        while (this.buffer) 
                        {
                            const bufferValue = this.buffer.target.value;
                            data = await this.slugService.checkSlug(
                                this.model,
                                bufferValue
                            );
                            if (bufferValue === this.buffer.target.value) this.buffer = undefined;
                        }
                        this.running = false;
                        
                        if (environment.debug) console.log('DEBUG - Data from slug Query: ', data.data);
                        if (data) this.control.control.parent.controls[this.target].setValue(data.data.slug);

                        return data;
                    }
                    else if (event.target.value && this.running) 
                    {
                        // add event tu buffer
                        this.buffer = event;
                        return from([]);
                    }
                    // only for empty values
                    else
                    {
                        return from([]);
                    }
                })
            )
            .takeUntil(this.ngUnsubscribe)
            .subscribe();
    }

    ngOnDestroy() 
    {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
        if (environment.debug) console.log('DEBUG - SlugDirective destroyed');
    }
}
