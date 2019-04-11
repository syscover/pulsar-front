import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[dh2FilterItem]'
})
export class FilterItemDirective
{
    @HostListener('click', ['$event'])
    onClick(e: MouseEvent): boolean
    {
        e.stopPropagation();
        e.preventDefault();

        return false;
    }
}
