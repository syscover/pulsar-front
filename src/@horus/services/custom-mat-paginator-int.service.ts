import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CustomMatPaginatorIntlService extends MatPaginatorIntl 
{
    constructor(private translateService: TranslateService) 
    {
        super();

        this.translateService.onLangChange.subscribe((e: Event) => {
            this.getAndInitTranslations();
        });

        this.getAndInitTranslations();
    }

    getAndInitTranslations(): void
    {
        this.translateService
            .get(['APPS.ITEMS_PER_PAGE', 'PAGINATOR.NEXT_PAGE', 'PAGINATOR.PREVIOUS_PAGE', 'PAGINATOR.OF_LABEL'])
            .subscribe(translation => {
                this.itemsPerPageLabel = translation['PAGINATOR.ITEMS_PER_PAGE'];
                this.nextPageLabel = translation['PAGINATOR.NEXT_PAGE'];
                this.previousPageLabel = translation['PAGINATOR.PREVIOUS_PAGE'];
                this.changes.next();
            });
    }

    getRangeLabel = (page: number, pageSize: number, length: number) =>  {
        if (length === 0 || pageSize === 0) 
        {
            return `0 / ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        
        return `${startIndex + 1} - ${endIndex} / ${length}`;
    }
}
