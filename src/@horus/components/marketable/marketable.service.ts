import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { environment } from 'environments/environment';
import { NumberFormatPipe } from '../../pipes/number-format.pipe';
import gql from 'graphql-tag';
import { Category, Section } from '../../../app/main/apps/market/market.models';
import * as _ from 'lodash';

@Injectable()
export class MarketableService
{
    env: any = environment;

    constructor(
        private _http: HttpService,
        private _numberFormatPipe: NumberFormatPipe
    ) {}

    calculateProfitability(fg: FormGroup, cost: number, subtotal: number): void
    {
        if (cost && subtotal)
        {
            fg.get('profitability').setValue(this._numberFormatPipe.transform(100 - ((cost * 100) / subtotal), 2));
        }
        else
        {
            fg.get('profitability').setValue(null);
        }
    }

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

                // calculate profitability
                this.calculateProfitability(fg, fg.get('cost').value, data.marketProductTaxes.subtotal)

                if (callback) callback();

                // reset price field
                if (fg.get('price').value) fg.get('price').setValue(null);

                if (loadingPrice) loadingPrice(false);
            });
    }

    getArgumentsRelations(baseLangId: number, langId: number, productId?: string, objectType = null): object
    {
        const sqlMarketableProduct = [
            {
                command: 'where',
                column: 'market_product_lang.lang_id',
                operator: '=',
                value: langId ? langId : baseLangId
            },
            {
                command: 'where',
                column: 'market_product.object_type',
                operator: '=',
                value: objectType
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'market_product.sort'
            }
        ];

        if (productId)
        {
            sqlMarketableProduct.push({
                command: 'where',
                column: 'market_product.id',
                operator: '<>',
                value: productId
            });
        }

        const sqlMarketableCategory = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: langId ? langId : baseLangId
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'market_category.name'
            }
        ];

        const sqlMarketableSection = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: langId ? langId : baseLangId
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'market_section.name'
            }
        ];

        const configMarketableProductClasses = {
            key: 'pulsar-market.product_classes',
            lang: langId ? langId : baseLangId,
            property: 'name'
        };

        const configMarketablePriceTypes = {
            key: 'pulsar-market.price_types',
            lang: langId ? langId : baseLangId,
            property: 'name'
        };

        return {
            sqlMarketableProduct,
            sqlMarketableCategory,
            sqlMarketableSection,
            configMarketableProductClasses,
            configMarketablePriceTypes
        };
    }

    afterPatchValueEdit(fg: FormGroup, categories: Category[], sections: Section[], subtotal: number, forceCalculatePriceWithoutTax?: boolean, callback?: Function): void
    {
        // set market categories extracting ids
        fg.get('categories_id').setValue(_.uniq(_.map(categories, 'id')));

        // set market sections extracting ids
        fg.get('sections_id').setValue(_.uniq(_.map(sections, 'id')));

        this.handleGetProductTaxes(
            fg,
            subtotal,
            forceCalculatePriceWithoutTax,
            callback
        );
    }

    getCustomArgumentsPostRecord(args): object
    {
        // if product is event, reset cost
        if (args.payload.class_id === 5)
        {
            args.payload.cost = null;
        }
        // else reset event fields
        else
        {
            args.payload.starts_at = null;
            args.payload.ends_at = null;
            args.payload.limited_capacity = null;
            args.payload.fixed_cost = null;
            args.payload.cost_per_sale = null;
        }

        return args;
    }
}
