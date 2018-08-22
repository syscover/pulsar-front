import { Directive, AfterViewInit, ElementRef, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators/switchMap';
import { from } from 'rxjs/observable/from';
import { SlugService } from './../services/slug.service';
import { environment } from 'environments/environment';

@Directive({
    selector: '[dh2Slug]',
    providers: [
        SlugService
    ]
})
export class SlugDirective implements AfterViewInit, OnDestroy
{
    @Input('model') model;
    @Input('object') object: any;
    @Input('target') target = 'slug';
    @Output() checkingSlug = new EventEmitter<boolean>();

    private ngUnsubscribe = new Subject();
    private running = false; // boolean true when is consulting through Http
    private buffer: any;

    constructor(
        private element: ElementRef,
        private control: NgControl,
        private slugService: SlugService
    ) { }

    ngAfterViewInit(): void
    {
        Observable
            .fromEvent(this.element.nativeElement, 'keyup')
            .debounceTime(250)
            .distinctUntilChanged()
            .pipe(
                switchMap(async (event: any) => {
                    // check if there ara value and theroe isn't a request in progress
                    if (event.target.value) 
                    {
                        if (! this.running)
                        {
                            this.checkingSlug.emit(true);
                            this.running = true;
                            let data: any;

                            data = await this.slugService.checkSlug(
                                this.model,
                                event.target.value,
                                this.object
                            );

                            // check buffer
                            while (this.buffer)
                            {
                                const bufferValue = this.buffer;
                                data = await this.slugService.checkSlug(
                                    this.model,
                                    this.buffer,
                                    this.object
                                );
                                // reset buffer
                                this.buffer = undefined;
                            }

                            if (environment.debug) console.log('DEBUG - Data from slug Query: ', data.data);
                            if (data) this.control.control.parent.controls[this.target].setValue(data.data.slug);

                            this.running = false;
                            this.checkingSlug.emit(false);

                            return data;
                        }
                        else
                        {
                            // add event tu buffer
                            this.buffer = event.target.value;
                            return from([]);
                        }
                    }
                    else
                    {
                        return from([]);
                    }
                })
            )
            .takeUntil(this.ngUnsubscribe)
            .subscribe();
    }

    ngOnDestroy(): void
    {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
        if (environment.debug) console.log('DEBUG - SlugDirective destroyed');
    }
}
