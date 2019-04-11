import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'dh2-filter-header-cell',
    templateUrl: './filter-header-cell.component.html',
    styleUrls: ['./filter-header-cell.component.scss']
})

export class FilterHeaderCellComponent implements OnInit
{
    public conditions = [
        { value: 'none', trans: 'FILTER_HEADER_CELL.NONE' },
        { value: 'IS NULL', trans: 'FILTER_HEADER_CELL.IS_EMPTY' },
        { value: 'IS NOT NULL', trans: 'FILTER_HEADER_CELL.IS_NOT_EMPTY' },
        { value: 'LIKE', trans: 'FILTER_HEADER_CELL.IS_EQUAL' },
        { value: '><', trans: 'FILTER_HEADER_CELL.IS_NOT_EQUAL' }
    ];
    public searchValue: string;
    public searchCondition: string;

    @Input() column: string;
    @Input() columnTitle: string;
    @Input() sort = false;
    @Output() filter = new EventEmitter<Object>();

    constructor() { }

    ngOnInit(): void
    { }

    applyFilter(): void
    {
        this.filter.emit({
            value: this.searchValue,
            operator: this.searchCondition,
            column: this.column
        });
    }

    clearFilter(): void
    {
        this.filter.emit({
            value: undefined,
            operator: undefined,
            column: this.column
        });
    }
}
