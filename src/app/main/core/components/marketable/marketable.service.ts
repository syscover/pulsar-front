import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { environment } from 'environments/environment';
import gql from 'graphql-tag';

@Injectable()
export class MarketableService
{
    env: any = environment;

    constructor(
        private _http: HttpService
    ) {}

    handleGetProductTaxes(fg: FormGroup, subtotal?: number, forceCalculatePriceWithoutTax?: boolean, callback?: Function, loadingPrice?: Function): void
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
        if (loadingPrice) loadingPrice(true);

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

                if (loadingPrice) loadingPrice(false);
            });
    }

    getArgumentsRelations(baseLang: string, lang_id: string, id?: string, isInherited: boolean = false, object_type = null): Object
    {
        const sqlProduct = [
            {
                command: 'where',
                column: 'market_product_lang.lang_id',
                operator: '=',
                value: lang_id ? lang_id : baseLang
            },
            {
                command: 'where',
                column: 'market_product.object_type',
                operator: '=',
                value: object_type
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'market_product.sort'
            }
        ];

        if (id) {
            sqlProduct.push({
                command: 'where',
                column: isInherited ? 'market_product.object_id' : 'market_product.id',
                operator: '<>',
                value: id
            });
        }

        console.log(sqlProduct);

        const sqlCategory = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: lang_id ? lang_id : baseLang
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'market_category.name'
            }
        ];

        const sqlSection = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: lang_id ? lang_id : baseLang
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'market_section.name'
            }
        ];

        const configProductTypes = {
            key: 'pulsar-market.product_types',
            lang: lang_id ? lang_id : baseLang,
            property: 'name'
        };

        const configPriceTypes = {
            key: 'pulsar-market.price_types',
            lang: lang_id ? lang_id : baseLang,
            property: 'name'
        };

        return {
            sqlProduct,
            sqlCategory,
            sqlSection,
            configProductTypes,
            configPriceTypes
        };
    }
}
