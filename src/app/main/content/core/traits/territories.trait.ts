import { TerritorialArea1, TerritorialArea2, TerritorialArea3 } from './../../apps/admin/admin.models';
import { Country } from './../../apps/admin/admin.models';
import { HttpService } from './../services/http.service';
import { environment } from './../../../../../environments/environment';
import { TerritorialArea1GraphQLService } from './../../apps/admin/territorial_area_1/territorial-area-1-graphql.service';
import * as _ from 'lodash';

export class Territories 
{
    protected httpService: HttpService;
    protected territorialArea1GraphQLService: TerritorialArea1GraphQLService;
    env: any = environment;
    countries: Country[] = [];
    ta1Name: string; 
    ta2Name: string;
    ta3Name: string;
    territorialAreas1: TerritorialArea1[] = [];
    territorialAreas2: TerritorialArea2[] = [];
    territorialAreas3: TerritorialArea3[] = [];
    showTerritorialAreas1 = false;
    showTerritorialAreas2 = false;
    showTerritorialAreas3 = false;

    handleChangeCountry($event)
    {
        const country = _.find(this.countries, {id: $event.value});
        if (country.zones && Array.isArray(country.zones)) 
        {
            this.showTerritorialAreas1 = false;
            this.showTerritorialAreas2 = false;
            this.showTerritorialAreas3 = false;

            for (const zone of country.zones)
            {
                // show territorial area is is defined in zones and territorial area has name
                if (zone === 'territorial_areas_1' && country.territorial_area_1) this.getTerritorialArea1(country);
                if (zone === 'territorial_areas_2' && country.territorial_area_2) this.showTerritorialAreas2 = true;
                if (zone === 'territorial_areas_3' && country.territorial_area_3) this.showTerritorialAreas3 = true;
            }
        }
        else
        {
            // if country has territorial name
            if (country.territorial_area_1) this.getTerritorialArea1(country);
            this.showTerritorialAreas1 = country.territorial_area_1 ? true : false;
            this.showTerritorialAreas2 = country.territorial_area_2 ? true : false;
            this.showTerritorialAreas3 = country.territorial_area_3 ? true : false;
        }

        // set names of territorial areas
        
        if (country.territorial_area_2) this.ta2Name = country.territorial_area_2;
        if (country.territorial_area_3) this.ta3Name = country.territorial_area_3;
    }

    handleChangeTerritorialArea1($event)
    {

    }

    handleChangeTerritorialArea2($event)
    {

    }

    getTerritorialArea1(country)
    {
        if (country.territorial_area_1)
        {
            const ob$ = this.httpService
                .apolloClient()
                .watchQuery({
                    fetchPolicy: 'network-only',
                    query: this.territorialArea1GraphQLService.queryObjects,
                    variables: {
                        sql: [{
                            command: 'where',
                            column: 'admin_territorial_area_1.country_id',
                            operator: '=',
                            value: country.id
                        },
                        {
                            command: 'orderBy',
                            operator: 'asc',
                            column: 'admin_territorial_area_1.name'
                        }]
                    }
                })
                .valueChanges
                .subscribe(({data}: any) => {
                    ob$.unsubscribe();
                    if (this.env.debug) console.log('DEBUG - response of query to get territorial area 1: ', data);

                    this.territorialAreas1 = data.coreObjects;
                    
                    // set territorial area 1 name
                    this.ta1Name = country.territorial_area_1;
                    this.showTerritorialAreas1 = true;
                });
        }
    }
}
