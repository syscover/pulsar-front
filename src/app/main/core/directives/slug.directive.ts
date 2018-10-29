import { Directive, AfterViewInit, ElementRef, Input, Output, OnChanges, OnDestroy, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators/switchMap';
import { from } from 'rxjs/observable/from';
import { merge } from 'rxjs/observable/merge';
import { SlugService } from './../services/slug.service';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';

@Directive({
    selector: '[dh2Slug]',
    providers: [
        SlugService
    ]
})
export class SlugDirective implements AfterViewInit, OnDestroy, OnChanges
{
    @Input('model') model;
    @Input('object') object: any;
    @Input('target') target = 'slug';
    @Input('value') value: string;
    @Output() checkingSlug = new EventEmitter<boolean>();

    private ngUnsubscribe = new Subject();
    private running = false; // boolean true when is consulting through Http
    private buffer: any;
    private value$: BehaviorSubject<string>;

    constructor(
        private element: ElementRef,
        private control: NgControl,
        private slugService: SlugService
    ) { }

    ngOnChanges(): void {
        if (! this.value$) {
            this.value$ = new BehaviorSubject<string>(this.value);
        }
        this.value$.next(this.value);
    }

    ngAfterViewInit(): void
    {
        merge(
                Observable.fromEvent(this.element.nativeElement, 'change'),
                this.value$
            )
            .debounceTime(250)
            .distinctUntilChanged()
            .pipe(
                switchMap(async (event: any) => {

                    let source = null;
                    if (typeof event === 'string' && event)
                    {
                        source = event;
                    }
                    else if (event) {
                        source = event.target.value;
                    }

                    // check if there are value and there isn't a request in progress
                    if (source)
                    {
                        if (! this.running)
                        {
                            this.checkingSlug.emit(true);
                            this.running = true;
                            let data: any;

                            data = await this.slugService.checkSlug(
                                this.model,
                                source,
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
                            if (data)
                            {
                                this.control.control.parent.controls[this.target].setValue(data.data.slug);
                            }

                            this.running = false;
                            this.checkingSlug.emit(false);

                            return data;
                        }
                        else
                        {
                            // add event tu buffer
                            this.buffer = source;
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
