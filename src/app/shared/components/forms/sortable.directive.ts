import { Directive, ElementRef, NgZone, Input, Output, EventEmitter, OnInit } from '@angular/core';

declare const jQuery: any; // jQuery definition

@Directive({
    selector: '[psSortable]'
})

export class SortableDirective implements OnInit {
    @Input() sortable;
    @Output() onSort: EventEmitter<any> = new EventEmitter();

    // adding private or public makes custructor input argument a member of class
    constructor(
        private element: ElementRef,
        private zone: NgZone
    ) { }

    // it is important to add jquery sortable after init and not in constructor
    // ngOnInit gets called after html is added
    public ngOnInit(): void {
        let dragIndex: number;
        let dropIndex: number;

        // we want to run this code outside of angular so it doesn't mess with angular structure
        this.zone.runOutsideAngular(() => {

            // you want to pass native element to jquery not angular wrapped element
            // if you want to learn more do console.log(element) and console.log(element.nativeElement)
            jQuery(this.element.nativeElement).sortable({
                start : (event, ui) => {
                    dragIndex = this.domIndexOf(ui.item, event.target);
                },
                update: (event, ui) => {
                    dropIndex = this.domIndexOf(ui.item, event.target);
                    let targetChild = this.sortable.splice(dragIndex, 1)[0];

                    //let angular know we are updating his data
                    this.zone.run(() => {
                        this.sortable.splice(dropIndex, 0, targetChild);
                        this.onSort.emit(this.sortable);
                    });
                }
            });
        });
    }

    // get index of child element in parerent.children array
    private domIndexOf(child: any, parent: any): any {
        return Array.prototype.indexOf.call(parent.children, child[0]);
    }
}
