import { Component, Input, OnInit, OnChanges, ViewChild, HostListener, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
declare const jQuery: any; // jQuery definition

@Component({
    selector: 'ps-attachment-files-library',
    templateUrl: './attachment-files-library.html',
    styleUrls: ['./attachment-files-library.scss']
})
export class AttachmentFilesLibraryComponent implements OnInit {

    @Input() private form: FormGroup;
    @Input() private name: string;
    private items: any[] = [1,2,3,4,5];

    @Input('attachments') private attachments;
    @ViewChild('attachmentLibrary') private attachmentLibrary;
    @ViewChild('attachmentLibraryMask') private attachmentLibraryMask;
    @ViewChild('libraryPlaceholder') private libraryPlaceholder;

    constructor(
        private _renderer: Renderer2
    ) { }

    ngOnInit() {
       this.handleDrop();
    }

    @HostListener('dragover', ['$event'])
    handleDragover($event) {
        $event.stopPropagation();

       if (
           //this.attachmentLibrary.nativeElement.contains($event.target) ||
           //$event.target.id === 'attachment-library' ||
           $event.target.id === 'attachment-library-mask'
        ) {
            // show veiled layer
           this._renderer.setStyle(this.attachmentLibraryMask.nativeElement, 'z-index', 9999999999);
           this._renderer.setStyle(this.attachmentLibraryMask.nativeElement, 'opacity', 1);
        } else {
            // hide veiled layer
            this._renderer.setStyle(this.attachmentLibraryMask.nativeElement, 'opacity', 0);
            this._renderer.setStyle(this.attachmentLibraryMask.nativeElement, 'z-index', -1);
        }
    }

    @HostListener('dragenter', ['$event'])
    handleDragenter($event) {
        $event.stopPropagation();

       if (
           //this.attachmentLibrary.nativeElement.contains($event.target) ||
           $event.target.id === 'attachment-library' //||
          // $event.target.id === 'attachment-library-mask'
        ) {
            // show veiled layer
           this._renderer.setStyle(this.attachmentLibraryMask.nativeElement, 'z-index', 9999999999);
           this._renderer.setStyle(this.attachmentLibraryMask.nativeElement, 'opacity', 1);
        }
    }

    @HostListener('dragleave', ['$event'])
    handleDragleave($event) {
        $event.stopPropagation();

        if (
            //$event.target.id === 'attachment-library' ||
            $event.target.id === 'attachment-library-mask'
        ) {
            // hide veiled layer
            this._renderer.setStyle(this.attachmentLibraryMask.nativeElement, 'opacity', 0);
            this._renderer.setStyle(this.attachmentLibraryMask.nativeElement, 'z-index', -1);
        }
    }

    handleDrop() {
        this._renderer.listen(this.attachmentLibraryMask.nativeElement, 'drop', ($event) => {
            $event.stopPropagation();
            // hide veiled layer
            this._renderer.setStyle(this.attachmentLibraryMask.nativeElement, 'opacity', 0);
            this._renderer.setStyle(this.attachmentLibraryMask.nativeElement, 'z-index', -1);

        });
    }



    // store files in library database
    storeLibrary(files) {
        jQuery.ajax({
            url: '',//'{{ route('storeAttachmentLibrary') }}',
            data:       {
                files:              files,
                resource:           '',//'{{ $resource }}',
                routesConfigFile:   '', //{{ $routesConfigFile }}'
            },
            headers:  {
                'X-CSRF-TOKEN': ''//'{{ csrf_token() }}'
            },
            type:		'POST',
            dataType:	'json',
            success: function(libraryDataStored)
            {
                // Variable $action defined in edit.blade.php with a include or from traitController
               // @if($action == 'update')
                    // Guardamos el adjunto en la base de datos, ya que es un objeto
                    // que estamos editando y ya está registrado en la base de datos
                //    $.storeAttachment(libraryDataStored.files);
                //@else
                    if(jQuery('.sortable li').length == 0 && libraryDataStored.files.length > 0) jQuery('#library-placeholder').hide();

                    libraryDataStored.files.forEach(function(file, index, array){
                        jQuery('.sortable').loadTemplate('#file', {
                           // image:              file.type.id == 1? '{{ config($routesConfigFile . '.tmpFolder') }}/' + file.tmpFileName : '{{ config($routesConfigFile . '.iconsFolder') }}/' + file.type.icon,
                            fileName:           file.fileName,
                            tmpFileName:        file.tmpFileName,
                            isImage:            file.type.id == 1? 'is-image' : 'no-image'
                        }, { prepend:true });
                    });

                    // set input hidden with attachment data
                    var attachments = JSON.parse(jQuery('[name=attachments]').val());
                    jQuery('[name=attachments]').val(JSON.stringify(attachments.concat(libraryDataStored.files)));

                   // $.shortingElements();
                   // $.setAttachmentActions();
                  //  $.setEventSaveAttachmentProperties();
                //@endif
            }
        });
    }

    // Update elements only on database
    updateAttachment(element) {

        var attachments         = JSON.parse(jQuery('[name=attachments]').val());
        var attachmentToUpdate  = null;

        attachments.forEach(function(attachment, index, array){
            if(attachment.id == jQuery(element).closest('li').data('id'))
            {
                attachmentToUpdate = attachment;
            }
        });
        //var url = '{{ route('updateAttachment', ['object'=> isset($objectId)? $objectId : null , 'lang'=> $lang->id_001, 'id' => '%id%']) }}';

        // update attachment across ajax
        jQuery.ajax({
            url:    '', //url.replace('%id%', $(element).closest('li').data('id')),
            headers:  {
                'X-CSRF-TOKEN': '{{ csrf_token() }}'
            },
            data: {
                _method: 'PUT',
                attachment: attachmentToUpdate,
                action: '{{ $action }}',
                routesConfigFile: '{{ $routesConfigFile }}'
        },
            type:		'POST',
            dataType:	'json',
            success: function(data){}
        });
    }







    /*private removeAttachment(element) {
        const fileName = $(element).find('.file-name').html();
        let attachments = JSON.parse($('[name=attachments]').val());

        attachments.forEach(function(attachment, index, attachments){
            if (attachment.fileName === fileName) {
                attachments.splice(index, 1);
            }
        });

        $('[name=attachments]').val(JSON.stringify(attachments));

        $(element).remove();

        if ($('.sortable li').length === 0) {
            $('#library-placeholder').show().css('opacity', 1).css('z-index', 'auto');
        } else {
            $.shortingElements();
        }
    }*/

    /*private setNameAttachment(element) {
        // set name of image
        var fileName    = $(element).closest('li').find('.file-name').html();
        var attachments = JSON.parse($('[name=attachments]').val());

        attachments.forEach(function(attachment, index, array){
            if(attachment.fileName == fileName)
            {
                attachment.name = $(element).closest('li').find('.image-name').val();
            }
        });

        // set previous value to image name
        $(element).closest('li').find('.image-name').data('previous', $(element).closest('li').find('.image-name').val());

        $('[name=attachments]').val(JSON.stringify(attachments));
    }

    private setFamilyAttachment(fileName, family) {
        var attachments = JSON.parse($('[name=attachments]').val());

        attachments.forEach(function(attachment, index, array){
            if (attachment.fileName === fileName) {
                attachment.family = family;
            }
        });

        $('[name=attachments]').val(JSON.stringify(attachments));
    };*/
}
