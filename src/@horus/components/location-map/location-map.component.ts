import { Component, Input, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { environment } from 'environments/environment';
import { horusConfig } from 'app/horus-config';

@Component({
    selector: 'dh2-location-map',
    styles: [`
        :host{
            justify-content: center;
        }
        .search-box {
            width: 60% !important;
            position: absolute;
            z-index: 1;
            background-color: rgba(255, 255, 255, 0.8);
        }
    `],
    template: `        
        <div class="d-flex justify-content-center">
            <div fxLayout="row" class="search-box justify-content-center">
                <mat-form-field [appearance]="horusConfig.fieldAppearance" class="col-11">
                    <mat-label>{{ 'APPS.SEARCH_LOCATION' | translate }}</mat-label>
                    <input  matInput
                            #search>
                </mat-form-field>
            </div>
        </div>
        
        <agm-map    [style.height]="height"
                    [latitude]="formGroup.get(latitudeControlName).value ? formGroup.get(latitudeControlName).value : dedaultLatitude" 
                    [longitude]="formGroup.get(longitudeControlName).value ? formGroup.get(longitudeControlName).value : dedaultLongitude"
                    [mapTypeControl]="true"
                    [mapTypeControlOptions]="mapTypeControlOptions">
            
            <agm-marker #marker
                        [latitude]="formGroup.get(latitudeControlName).value ? formGroup.get(latitudeControlName).value : dedaultLatitude" 
                        [longitude]="formGroup.get(longitudeControlName).value ? formGroup.get(longitudeControlName).value : dedaultLongitude"
                        [markerDraggable]="true"
                        (dragEnd)="markerDragEnd($event)"></agm-marker>
            
        </agm-map>
    `
})

export class LocationMapComponent implements OnInit
{
    @Input() formGroup: FormGroup;
    @Input() latitudeControlName = 'latitude';
    @Input() longitudeControlName = 'longitude';
    @Input() height = '300px';
    @ViewChild('search', {static: false}) serachBox: ElementRef;
    @ViewChild('marker', {static: false}) marker: ElementRef;

    dedaultLatitude = 40.420179;
    dedaultLongitude = -3.703927;
    mapTypeControlOptions: any;
    horusConfig = horusConfig;

    constructor(
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone
    ) {
    }

    ngOnInit(): void
    {
        // load Places Autocomplete
        this.mapsAPILoader.load().then(() => {

            const autocomplete = new google.maps.places.Autocomplete(this.serachBox.nativeElement, {
                types: ['address']
            });

            autocomplete.addListener('place_changed', () => {
                this.ngZone.run(() => {

                    // get the place result
                    const place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    // verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    // set latitude, longitude and zoom
                    this.formGroup.get(this.latitudeControlName).setValue(place.geometry.location.lat());
                    this.formGroup.get(this.longitudeControlName).setValue(place.geometry.location.lng());
                    // this.zoom = 12;
                });
            });

            this.mapTypeControlOptions = {
                position: google.maps.ControlPosition.BOTTOM_CENTER
            };
        });
    }

    markerDragEnd($event): void
    {
        if (environment.debug) console.log('DEBUG - markerDragEnd event: ', $event);

        this.formGroup.get(this.latitudeControlName).setValue($event.coords.lat);
        this.formGroup.get(this.latitudeControlName).markAsDirty();
        this.formGroup.get(this.longitudeControlName).setValue($event.coords.lng);
        this.formGroup.get(this.longitudeControlName).markAsDirty();
    }
}
