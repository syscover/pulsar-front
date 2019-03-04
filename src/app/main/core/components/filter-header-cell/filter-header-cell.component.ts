import { Component, OnInit} from '@angular/core';

export const CONDITIONS_LIST = [
    { value: 'nono', label: 'Nono' },
    { value: 'is-empty', label: 'Is empty' },
    { value: 'is-not-empty', label: 'Is not empty' },
    { value: 'is-equal', label: 'Is equal' },
    { value: 'is-not-equal', label: 'Is not equal' }
];

export const CONDITIONS_FUNCTIONS = { // search method base on conditions list value
    'is-empty': function (value, filterdValue) {
        return value === '';
    },
    'is-not-empty': function (value, filterdValue) {
        return value !== '';
    },
    'is-equal': function (value, filterdValue) {
        return value == filterdValue;
    },
    'is-not-equal': function (value, filterdValue) {
        return value != filterdValue;
    }
};

@Component({
    selector: 'dh2-filter-header-cell',
    templateUrl: './filter-header-cell.component.html',
    styleUrls: ['./filter-header-cell.component.scss']
})

export class FilterHeaderCellComponent implements OnInit
{
    public conditionsList = CONDITIONS_LIST;
    public searchValue: any = {};
    public searchCondition: any = {};
    private _filterMethods = CONDITIONS_FUNCTIONS;

    constructor(

    ) { }

    ngOnInit(): void
    {

    }

    applyFilter(): void
    {
        const searchFilter: any = {
            values: this.searchValue,
            conditions: this.searchCondition,
            methods: this._filterMethods
        };

        // this.dataSource.filter = searchFilter;
    }

    clearColumn(columnKey: string): void
    {
        this.searchValue[columnKey] = null;
        this.searchCondition[columnKey] = 'none';
        this.applyFilter();
    }
}
