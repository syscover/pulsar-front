import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class Test extends Plugin
{
    init() 
    {
        console.log('init test plugin');
    }
}