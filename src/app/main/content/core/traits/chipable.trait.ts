
import { MatChipInputEvent } from '@angular/material';

export class Chipable 
{
    addTag(tagContainer: Array<String>, event: MatChipInputEvent): void
    {
        const input = event.input;
        const value = event.value;
    
        // Add tag
        if ( value )
        {
            tagContainer.push(value);
        }
    
        // Reset the input value
        if ( input )
        {
            input.value = '';
        }
    }
    
    removeTag(tagContainer: Array<String>, tag): void
    {
        const index = tagContainer.indexOf(tag);
    
        if ( index >= 0 )
        {
            tagContainer.splice(index, 1);
        }
    }
}
