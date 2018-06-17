import { Component, Input, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { environment } from '../../../../../../environments/environment';

@Component({
    selector: 'dh2-location-map',
    styles: [`
        agm-map {
            height: 500px;
        }
        .search-box {
            position: absolute;
            z-index: 1;
            width: 100%;
            background-color: rgba(255, 255, 255, 0.8);
        }
    `],
    template: `        
        <div fxLayout="row" class="search-box justify-content-center">
            <mat-form-field class="col-11">
                <input  matInput
                        #search
                        placeholder="{{ 'APPS.SEARCH_LOCATION' | translate }}">
            </mat-form-field>
        </div>
        <agm-map    [latitude]="formGroup.get(latitudeControlName).value ? formGroup.get(latitudeControlName).value : dedaultLatitude" 
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
    @ViewChild('search') serachBox: ElementRef;
    @ViewChild('marker') marker: ElementRef;

    dedaultLatitude = 40.420179;
    dedaultLongitude = -3.703927;
    mapTypeControlOptions: any;

    constructor(
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone
    ) {
    }

    ngOnInit()
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

            console.log(this.marker.nativeElement);

            this.mapTypeControlOptions = {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.BOTTOM_LEFT
            };
        });
    }

    markerDragEnd($event)
    {
        if (environment.debug) console.log('DEBUG - markerDragEnd event: ', $event);

        this.formGroup.get(this.latitudeControlName).setValue($event.coords.lat);
        this.formGroup.get(this.longitudeControlName).setValue($event.coords.lng);
    }
}
