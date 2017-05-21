import { Component, Input, OnInit, AfterContentInit, AfterViewInit, OnChanges, ViewChild, HostListener, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
declare const jQuery: any; // jQuery definition

@Component({
    selector: 'ps-attachment-files-library',
    templateUrl: './attachment-files-library.html',
    styleUrls: ['./attachment-files-library.scss']
})
export class AttachmentFilesLibraryComponent implements OnInit, AfterContentInit, AfterViewInit {

    // Input elements
    @Input() name: string;
    @Input() folder: string; // folder where will be stored the files
    @Input() multiple: boolean;
    @Input() url: string;
    @Input() withCredentials: boolean;

    // View elements
    @ViewChild('attachmentLibrary')  attachmentLibrary;
    @ViewChild('attachmentLibraryMask') attachmentLibraryMask;
    @ViewChild('libraryPlaceholder') libraryPlaceholder;

    // properties
    public files: File[];
    public progress: number = 0;

   /* @Input() private form: FormGroup;
    @Input() private name: string;
    private items: any[] = [1,2,3,4,5];
    @Input('attachments') private attachments;*/

    constructor(
        private renderer: Renderer2,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
        this.renderer.listen(this.attachmentLibrary.nativeElement, 'dragenter', ($event) => {
            this.dragEnterHandler($event);
        });
        this.renderer.listen(this.attachmentLibrary.nativeElement, 'dragover', ($event) => {
            this.dragOverHandler($event);
        });
        this.renderer.listen(this.attachmentLibrary.nativeElement, 'dragleave', ($event) => {
            this.dragLeaveHandler($event);
        });
        this.renderer.listen(this.attachmentLibraryMask.nativeElement, 'drop', ($event) => {
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
        console.log('dragEnterHandler');
        $event.preventDefault();
        if ($event.currentTarget.id === 'attachment-library' || this.attachmentLibrary.nativeElement.contains($event.currentTarget)) {
            if (! this.attachmentLibraryMask.nativeElement.classList.contains('active')) {
                this.showMask();
            }
        }
    }

    private dragOverHandler($event) {
        console.log('dragOverHandler');
        $event.preventDefault();
        if ($event.currentTarget.id === 'attachment-library' || this.attachmentLibrary.nativeElement.contains($event.currentTarget)) {
            if (! this.attachmentLibraryMask.nativeElement.classList.contains('active')) {
                this.showMask();
            }
        } else {
            if (this.attachmentLibraryMask.nativeElement.classList.contains('active')) {
                this.hideMask();
            }
        }
    }

    private dragLeaveHandler($event) {
        console.log('dragLeaveHandler');
        $event.preventDefault();
        if ($event.currentTarget.id === 'attachment-library' || $event.currentTarget.id === 'attachment-library-mask') {
            if (this.attachmentLibraryMask.nativeElement.classList.contains('active')) {
                this.hideMask();
            }
        }
    }

    private dropHandler($event) {
        console.log('dropHandler');

        $event.preventDefault();
        if (this.attachmentLibraryMask.nativeElement.classList.contains('active')) {
            this.hideMask();
        }

        this.onFileSelect($event);
    }

    private showMask() {
        this.renderer.setStyle(this.attachmentLibraryMask.nativeElement, 'opacity', 1);
        this.renderer.setStyle(this.attachmentLibraryMask.nativeElement, 'visibility', 'visible');
        this.renderer.addClass(this.attachmentLibraryMask.nativeElement, 'active');

        //this.hidePlaceholder();
    }

    private hideMask() {
        this.renderer.setStyle(this.attachmentLibraryMask.nativeElement, 'opacity', 0);
        this.renderer.setStyle(this.attachmentLibraryMask.nativeElement, 'visibility', 'hidden');
        this.renderer.removeClass(this.attachmentLibraryMask.nativeElement, 'active');

        //this.showPlaceholder();
    }

    private showPlaceholder() {
        this.renderer.setStyle(this.libraryPlaceholder.nativeElement, 'opacity', 1);
        this.renderer.setStyle(this.libraryPlaceholder.nativeElement, 'visibility', 'visible');
    }

    private hidePlaceholder() {
        this.renderer.setStyle(this.libraryPlaceholder.nativeElement, 'opacity', 0);
        this.renderer.setStyle(this.libraryPlaceholder.nativeElement, 'visibility', 'hidden');
    }

    /**
     * Methods to upload files
     */

    onFileSelect($event) {
        //this.msgs = [];
        if (! this.multiple) {
            this.files = [];
        }

        let files = $event.dataTransfer ? $event.dataTransfer.files : $event.target.files;

        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            //if (this.validate(file)) {
              //  if (this.isImage(file)) {
                    file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
              //  }
                
                this.files.push(files[i]);
            //}
        }
        
        //this.onSelect.emit({originalEvent: event, files: files});
        
        if (this.hasFiles()) {
            this.upload();
        }
    }

    upload() {
        //this.msgs = [];
        let xhr = new XMLHttpRequest();
        let formData = new FormData(); // create forma data to add files and inputs

		/*this.onBeforeUpload.emit({
            'xhr': xhr,
            'formData': formData 
        });*/

        // append data for server
        formData.append('folder', this.folder);

        for (let file of this.files) {
            formData.append(this.name, file, file.name);
        }

        /*for (let i = 0; i < this.files.length; i++) {
            formData.append(this.name, this.files[i], this.files[i].name);
        }*/

// progress var
        /*xhr.upload.addEventListener('progress', (e: ProgressEvent) => {
            if (e.lengthComputable) {
              this.progress = Math.round((e.loaded * 100) / e.total);
            }
          }, false);*/

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this.progress = 0;

                if (xhr.status >= 200 && xhr.status < 300) {
                    //this.onUpload.emit({xhr: xhr, files: this.files});
                    let obj = JSON.parse(xhr.response);
                    console.log(obj);

                } else {
                    //this.onError.emit({xhr: xhr, files: this.files});
                }
                this.clearFiles();
            }
        };

        xhr.open('POST', this.url, true);
        xhr.withCredentials = this.withCredentials;
        xhr.send(formData);
    }

    hasFiles(): boolean {
        return this.files && this.files.length > 0;
    }

    clearFiles() {
        this.files = [];
        //this.onClear.emit();
    }
}
