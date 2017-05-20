import { Component, Input, OnInit, AfterContentInit, AfterViewInit, OnChanges, ViewChild, HostListener, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
declare const jQuery: any; // jQuery definition

@Component({
    selector: 'ps-attachment-files-library',
    templateUrl: './attachment-files-library.html',
    styleUrls: ['./attachment-files-library.scss']
})
export class AttachmentFilesLibraryComponent implements OnInit, AfterContentInit, AfterViewInit {

    @ViewChild('attachmentLibrary')  private _attachmentLibrary;
    @ViewChild('attachmentLibraryMask') private _attachmentLibraryMask;
    @ViewChild('libraryPlaceholder') private _libraryPlaceholder;

   /* @Input() private form: FormGroup;
    @Input() private name: string;
    private items: any[] = [1,2,3,4,5];
    @Input('attachments') private attachments;*/

    constructor(
        private _renderer: Renderer2
    ) { }

    ngOnInit() {

        

        this._renderer.listen(this._attachmentLibrary.nativeElement, 'dragenter', ($event) => {
            this.dragEnterHandler($event);
        });
        this._renderer.listen(this._attachmentLibrary.nativeElement, 'dragover', ($event) => {
            this.dragOverHandler($event);
        });
        this._renderer.listen(this._attachmentLibrary.nativeElement, 'dragleave', ($event) => {
            this.dragLeaveHandler($event);
        });
        this._renderer.listen(this._attachmentLibraryMask.nativeElement, 'drop', ($event) => {
            this.dropHandler($event);
        });

        const $sortable = jQuery('.sortable');
        $sortable.sortable();
        $sortable.disableSelection();
    }

    ngAfterContentInit() {
        console.log('ngAfterContentInit');
    }

    ngAfterViewInit() {
        console.log('ngAfterViewInit');
        
    }

    private dragEnterHandler($event) {
        $event.preventDefault();
        if ($event.currentTarget.id === 'attachment-library' || this._attachmentLibrary.nativeElement.contains($event.currentTarget)) {
            if (! this._attachmentLibraryMask.nativeElement.classList.contains('active')) {
                this.showMask();
            }
        }
    }

    private dragOverHandler($event) {
        $event.preventDefault();
        if ($event.currentTarget.id === 'attachment-library' || this._attachmentLibrary.nativeElement.contains($event.currentTarget)) {
            if (! this._attachmentLibraryMask.nativeElement.classList.contains('active')) {
                this.showMask();
            }
        } else {
            if (this._attachmentLibraryMask.nativeElement.classList.contains('active')) {
                this.hideMask();
            }
        }
    }

    private dragLeaveHandler($event) {
        $event.preventDefault();
        if ($event.currentTarget.id === 'attachment-library' || $event.currentTarget.id === 'attachment-library-mask') {
            if (this._attachmentLibraryMask.nativeElement.classList.contains('active')) {
                this.hideMask();
            }
        }
    }

    private dropHandler($event) {
        $event.preventDefault();
        if (this._attachmentLibraryMask.nativeElement.classList.contains('active')) {
            this.hideMask();
        }
    }

    private showMask() {
        this._renderer.setStyle(this._attachmentLibraryMask.nativeElement, 'opacity', 1);
        this._renderer.setStyle(this._attachmentLibraryMask.nativeElement, 'visibility', 'visible');
        this._renderer.addClass(this._attachmentLibraryMask.nativeElement, 'active');

        this.hidePlaceholder();
    }

    private hideMask() {
        this._renderer.setStyle(this._attachmentLibraryMask.nativeElement, 'opacity', 0);
        this._renderer.setStyle(this._attachmentLibraryMask.nativeElement, 'visibility', 'hidden');
        this._renderer.removeClass(this._attachmentLibraryMask.nativeElement, 'active');

        this.showPlaceholder();
    }

    private showPlaceholder() {
        this._renderer.setStyle(this._libraryPlaceholder.nativeElement, 'opacity', 1);
        this._renderer.setStyle(this._libraryPlaceholder.nativeElement, 'visibility', 'visible');
    }

    private hidePlaceholder() {
        this._renderer.setStyle(this._libraryPlaceholder.nativeElement, 'opacity', 0);
        this._renderer.setStyle(this._libraryPlaceholder.nativeElement, 'visibility', 'hidden');
    }
}
