import { Injectable } from '@angular/core';
import {FormGroup} from '@angular/forms';
import gql from 'graphql-tag';
import {HttpService} from '../../services/http.service';
import { environment } from 'environments/environment';

@Injectable()
export class MarketableService
{
    env: any = environment;

    constructor(
        private _http: HttpService
    ) {}

    handleGetProductTaxes(loadingPrice:boolean, fg: FormGroup, subtotal?, forceCalculatePriceWithoutTax?, callback?): void
    {
        let price;

        if (subtotal)
        {
            price = subtotal;
        }
        else if (fg.get('price').value)
        {
            price = fg.get('price').value;
        }
        else
        {
            price = fg.get('subtotal').value;
            forceCalculatePriceWithoutTax = true;
        }

        // if has not price, exit of method
        if (! price)
        {
            if (callback) callback();
            return;
        }

        // active loading spinner
        if (fg.get('price').value) loadingPrice = true;

        const args = {
            price: price,
            productClassTax: fg.get('product_class_tax_id').value
        };

        // force to calualte price without tax, when show product the price always
        // is without tax because is subtotal the refernece price, this flag is activated in
        // function setData os this component
        if (forceCalculatePriceWithoutTax) args['product_tax_prices'] = 1;

        const ob = this._http
            .apolloClient()
            .watchQuery({
                fetchPolicy: 'network-only',
                query: gql`
                    query MarketProductTaxes ($price:Float! $productClassTax:Int $product_tax_prices:Int) {
                        marketProductTaxes (price:$price productClassTax:$productClassTax product_tax_prices:$product_tax_prices)
                    }
                `,
                variables: args
            })
            .valueChanges
            .subscribe(({data}: any) => {
                ob.unsubscribe();
                if (this.env.debug) console.log('DEBUG - response of marketProductTaxes query: ', data);

                fg.get('subtotal').setValue(data.marketProductTaxes.subtotal);
                fg.get('subtotal_format').setValue(data.marketProductTaxes.subtotalFormat);
                fg.get('tax_format').setValue(data.marketProductTaxes.taxAmountFormat);
                fg.get('total_format').setValue(data.marketProductTaxes.totalFormat);

                if (callback) callback();

                // reset price field
                if (fg.get('price').value) fg.get('price').setValue(null);

                loadingPrice = false;
            });
    }
}
