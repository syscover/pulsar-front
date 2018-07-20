import {Component, Injector, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { Validators } from '@angular/forms';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { ProductGraphQLService } from './product-graphql.service';
import { StockGraphQLService } from './../stock/stock-graphql.service';
import { ProductStockDialogComponent } from './product-stock-dialog.component';
import { Product, ProductType, PriceType, ProductClassTax, Category, Stock } from './../market.models';
import { FieldGroup, AttachmentFamily } from './../../admin/admin.models';
import * as _ from 'lodash';
import gql from 'graphql-tag';

@Component({
    selector: 'dh2-product-detail',
    templateUrl: './product-detail.component.html',
    animations: fuseAnimations,
    styleUrls: [
        './../../../core/scss/improvements/perfect-scroll-bar.scss'
    ],
    encapsulation: ViewEncapsulation.None
})
export class ProductDetailComponent extends CoreDetailComponent implements OnInit
{
    objectTranslation = 'MARKET.PRODUCT';
    objectTranslationGender = 'M';
    productTypes: ProductType[] = [];
    priceTypes: PriceType[] = [];
    productClassTaxes: ProductClassTax[] = [];
    categories: Category[] = [];
    products: Product[] = [];
    fieldGroups: FieldGroup[] = [];
    attachmentFamilies: AttachmentFamily[] = [];
    loadingPrice = false;
    startCustomFields = false;

    // stocks
    displayedColumns = ['warehouse_id', 'warehouse_name', 'stock', 'minimum_stock', 'actions'];
    stocksData: any[] = [];
    dataSource = new MatTableDataSource();
    @ViewChild(MatSort) sort: MatSort;
    dialog: MatDialog;

    constructor(
        protected injector: Injector,
        public graphQL: ProductGraphQLService,
        private graphQLStock: StockGraphQLService
    ) {
        super(injector, graphQL);
    }

    ngOnInit()
    {
        super.ngOnInit();
        if (this.dataRoute.action === 'create')
        {
            // allow start dh2-dynamic-form component to avoid failures in the JWT
            this.startCustomFields = true;
        }
    }
    
    createForm() 
    {
        this.fg = this.fb.group({
            ix: null,
            id: [{value: null, disabled: true}],
            lang_id: [null, Validators.required],
            sku: null,
            categories_id: [[], Validators.required],
            name: [null, Validators.required],
            slug: [null, Validators.required],
            field_group_id: null,
            type_id: [null, Validators.required],
            parent_id: null,
            weight: [0],
            active: false,
            sort: null,
            price_type_id: [null, Validators.required],
            product_class_tax_id: [null, Validators.required],
            description: null,
            price: null,
            subtotal: null,
            subtotal_format: [{value: null, disabled: true}, Validators.required],
            tax_format: [{value: null, disabled: true}, Validators.required],
            total_format: [{value: null, disabled: true}, Validators.required],
            attachments: this.fb.array([])
        });
    }

    disabledForm() 
    {
        this.fg.controls['sku'].disable();
        this.fg.controls['categories_id'].disable();
        this.fg.controls['field_group_id'].disable();
        this.fg.controls['type_id'].disable();
        this.fg.controls['parent_id'].disable();
        this.fg.controls['weight'].disable();
        this.fg.controls['active'].disable();
        this.fg.controls['sort'].disable();
        this.fg.controls['price_type_id'].disable();
        this.fg.controls['product_class_tax_id'].disable();
        this.fg.controls['price'].disable();
        this.fg.controls['subtotal'].disable();
        this.fg.controls['subtotal_format'].disable();
        this.fg.controls['tax_format'].disable();
        this.fg.controls['total_format'].disable();
    }

    afterSetData() 
    {
        if (this.dataRoute.action === 'edit' || this.dataRoute.action === 'create-lang') 
        {
            if (this.dataRoute.action === 'create-lang') 
            {
                // disabled inputs that hasn't containt multi language
                this.disabledForm();
            } 
            else if (this.dataRoute.action === 'edit') 
            {
                // disabled elements if edit diferent language that base lang
                if (this.lang.id !== this.baseLang) this.disabledForm();
            }
        }
    }
    
    argumentsRelationsObject(): Object 
    {
        const sqlCategory = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: this.params['lang_id'] ? this.params['lang_id'] : this.baseLang
            }
        ];

        const sqlAttachmentFamily = [
            {
                'command': 'where',
                'column': 'admin_attachment_family.resource_id',
                'operator': '=',
                'value': 'market-product'
            },
            {
                'command': 'orderBy',
                'operator': 'asc',
                'column': 'admin_attachment_family.name'
            }
        ];

        const sqlProduct = [
            {
                'command': 'where',
                'column': 'market_product_lang.lang_id',
                'operator': '=',
                'value': this.params['lang_id'] ? this.params['lang_id'] : this.baseLang
            },
            {
                'command': 'orderBy',
                'operator': 'asc',
                'column': 'market_product.sort'
            }
        ];

        if (this.params['id']) {
            sqlProduct.push({
                command: 'where',
                column: 'market_product.id',
                operator: '<>',
                value: this.params['id']
            });
        }

        const sqlFieldGroup = [
            {
                command: 'where',
                column: 'resource_id',
                operator: '=',
                value: 'market-product'
            }
        ];

        const sqlStock = [
            {
                command: 'where',
                column: 'product_id',
                operator: '=',
                value: this.params['id']
            }
        ];

        const configProductTypes = {
            key: 'pulsar-market.product_types',
            lang: this.baseLang,
            property: 'name'
        };

        const configPriceTypes = {
            key: 'pulsar-market.price_types',
            lang: this.baseLang,
            property: 'name'
        };

        return {
            sqlCategory,
            sqlAttachmentFamily,
            sqlProduct,
            sqlFieldGroup,
            sqlStock,
            configProductTypes,
            configPriceTypes
        };
    }

    setRelationsData(data: any) 
    {
        // market product types
        this.productTypes = data.marketProductTypes;

        // market price types
        this.priceTypes = data.marketPriceTypes;

        // market product class taxes
        this.productClassTaxes = data.marketProductClassTaxes;

        // market product category
        this.categories = data.marketCategories;

        // market admin field groups
        this.fieldGroups = data.adminFieldGroups;

        // market products
        this.products = data.marketProducts;

        // admin attachment families
        this.attachmentFamilies = data.adminAttachmentFamilies;

        // market stock data
        for (const warehouse of data.marketWarehouses)
        {
            const stock = <Stock>_.find(data.marketStocks, {warehouse_id: warehouse.id});
            this.stocksData.push({
                warehouse_id: warehouse.id,
                warehouse_name: warehouse.name,
                product_id: data.coreObject.id,
                stock: stock ? stock.stock : 0,
                minimum_stock: stock ? stock.minimum_stock : 0,
            });
        }

        this.dataSource.sort = this.sort;
        this.dataSource.data = this.stocksData;
    }

    afterPatchValueEdit()
    {
        // set market categories extracting ids
        this.fg.controls['categories_id'].setValue(_.map(this.object.categories, 'id'));

        this.handleGetProductTaxes(
            this.fg.controls['subtotal'].value,
            true, // force to calulate price without tax
            // callback, all http petition must to be sequential to pass JWT
            () => {
                // allow start dh2-dynamic-form component to avoid failures in the JWT
                this.startCustomFields = true;
            }
        ); // calculate tax prices
    }

    // get taxes for product
    handleGetProductTaxes(subtotal?, forceCalculatePriceWithoutTax?, callback?): void 
    {
        let price;

        if (subtotal) 
        {
            price = subtotal;
        }
        else if (this.fg.controls['price'].value)
        {
            price = this.fg.controls['price'].value;
        }
        else
        {
            price = this.fg.controls['subtotal'].value;
            forceCalculatePriceWithoutTax = true;
        }

        // if has not price, exit of method
        if (! price) 
        {
            if (callback) callback();
            return;
        }

        // active loading spinner
        if (this.fg.controls['price'].value) this.loadingPrice = true;

        const args = {
            price: price,
            productClassTax: this.fg.controls['product_class_tax_id'].value
        };

        // force to calualte price without tax, when show product the price always
        // is without tax because is subtotal the refernece price, this flag is activated in
        // function setData os this component
        if (forceCalculatePriceWithoutTax) args['product_tax_prices'] = 1;

        const ob = this.httpService
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

                this.fg.controls['subtotal'].setValue(data.marketProductTaxes.subtotal);
                this.fg.controls['subtotal_format'].setValue(data.marketProductTaxes.subtotalFormat);
                this.fg.controls['tax_format'].setValue(data.marketProductTaxes.taxAmountFormat);
                this.fg.controls['total_format'].setValue(data.marketProductTaxes.totalFormat);

                if (callback) callback();

                // reset price field
                if (this.fg.controls['price'].value) this.fg.controls['price'].setValue(null);

                this.loadingPrice = false;
            });
    }

    editStock(stockData: any)
    {
        if (this.env.debug) console.log('DEBUG - Edit stock with this arguments: ', stockData);

        const dialogRef = this.dialog.open(ProductStockDialogComponent, {
            data: { 
                stockData: stockData
            },
            width: '80vw'
        });

        dialogRef.afterClosed().subscribe(newStockData => {

            if (newStockData) 
            {
                if (this.env.debug) console.log('DEBUG - Update stock with this arguments: ', newStockData);

                const ob$ = this.httpService
                    .apolloClient()
                    .mutate({
                        mutation: this.graphQLStock.mutationSetStock,
                        variables: {
                            object: {
                                warehouse_id: newStockData.warehouse_id,
                                product_id: newStockData.product_id,
                                stock: newStockData.stock,
                                minimum_stock: newStockData.minimum_stock
                            }
                        }
                    })
                    .subscribe((response) => {
                        ob$.unsubscribe();

                        // Find stock index using _.findIndex (thanks @AJ Richardson for comment)
                        const index = _.findIndex(this.stocksData, { warehouse_id: newStockData.warehouse_id, product_id: newStockData.product_id });

                        // Replace stock at index using native splice
                        this.stocksData.splice(index, 1, newStockData);

                        this.dataSource.data = this.stocksData;
                    });
            }
        });
    }
}
