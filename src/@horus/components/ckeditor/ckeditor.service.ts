import { Injectable } from '@angular/core';
import { UploadAdapter } from './upload-adapter';
import { ConfigService } from '../../services/config.service';
import Test from './plugins/test.plugin';

@Injectable()
export class CKEditorService 
{
    toolbar: object = {
        items: [
            'heading', '|', 
            'bold', 'italic', 'underline', 'alignment', 'link', 'bulletedList', 'numberedList', 
            // 'imageUpload',
            'blockQuote', 'insertTable', 'mediaEmbed', 'undo', 'redo']
    };

    image: object = {
        toolbar: [
            'imageStyle:full',
            'imageStyle:side',
            '|',
            'imageTextAlternative'
        ]
    };

    extraPlugins: any[] = [this.getUploadAdapterPlugin()];

    table: object = {
        contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells'
        ]
    };

    alignment: object = {
        options: ['left', 'center', 'right', 'justify']
    };

    constructor(
        private configService: ConfigService
    ) {}

    getUploadAdapterPlugin()
    {
        const localConfigService = this.configService;
        return function uploadAdapterPlugin(editor) 
        {
            editor.plugins.get('FileRepository').createUploadAdapter = (loader) => 
            {
                // Configure the URL to the upload script in your back-end here!
                return new UploadAdapter(loader, localConfigService.get('restUrl') + '/api/v1/admin/wysiwyg/upload');
            };
        };
    }
}
