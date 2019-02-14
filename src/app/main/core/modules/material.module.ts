import { NgModule } from '@angular/core';
import {
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatTooltipModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatStepperModule,
    DateAdapter
} from '@angular/material';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { CdkTableModule } from '@angular/cdk/table';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SelectSearchService } from '../services/select-search.service';

@NgModule({
    imports: [
        MatAutocompleteModule,
        MatBadgeModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatStepperModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        CdkTableModule,
        NgxMatSelectSearchModule,

        // date-picker
        // MatNativeDateModule,
        MatDatepickerModule,
        MatMomentDateModule,
    ],
    exports: [
        MatAutocompleteModule,
        MatBadgeModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatStepperModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        CdkTableModule,
        NgxMatSelectSearchModule,

        // date-picker
        // MatNativeDateModule,
        MatDatepickerModule,
        MatMomentDateModule,
    ],
    providers: [
        SelectSearchService,
        { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
    ]
})
export class MaterialModule
{
    constructor(
        private _translateService: TranslateService,
        private _dateAdapter: DateAdapter<Date>
    ) {
        // set current lang to datepicker
        if (this._translateService.currentLang)
        {
            this._dateAdapter.setLocale(this._translateService.currentLang);
        }

        // set new lang in datepicker when languague is changed
        _translateService
            .onLangChange
            .subscribe((event: TranslationChangeEvent) => {
                this._dateAdapter.setLocale(event.lang);
            });
    }
}
