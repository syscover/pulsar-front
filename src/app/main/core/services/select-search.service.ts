import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class SelectSearchService
{
    // TODO doesn't work,
    // setSelectSearch(filterCtrl: FormControl, objects: any[], objectsFiltered: ReplaySubject<any[]>, onDestroy: Subject<{}>): void
    // {
    //     filterCtrl
    //         .valueChanges
    //         .pipe(takeUntil(onDestroy))
    //         .subscribe(() => {
    //             this.filterSelect(
    //                 filterCtrl,
    //                 objects,
    //                 objectsFiltered
    //             );
    //         });
    // }

    filterSelect(filterCtrl: FormControl, objects: any[], objectsFiltered: ReplaySubject<any[]>): void
    {
        if (!objects) return;

        // get the search keyword
        let search = filterCtrl.value;
        if (!search) {
            objectsFiltered.next(objects.slice());
            return;
        }
        else {
            search = search.toLowerCase();
        }

        // filter the objects
        objectsFiltered.next(
            objects.filter(object => object.name.toLowerCase().indexOf(search) > -1)
        );
    }
}
