import { Component, Injector, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { ProductGraphQLService } from './product-graphql.service';
import { StockGraphQLService } from './../stock/stock-graphql.service';
import { ProductStockDialogComponent } from './product-stock-dialog.component';
import { Product, ProductType, PriceType, ProductClassTax, Category, Stock, Section } from './../market.models';
import { FieldGroup, AttachmentFamily } from './../../admin/admin.models';
import * as _ from 'lodash';
import gql from 'graphql-tag';
import {MarketableService} from '../../../core/components/marketable/marketable.service';

@Component({
    selector: 'dh2-market-product-detail',
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
    fieldGroups: FieldGroup[] = [];
    attachmentFamilies: AttachmentFamily[] = [];
    startCustomFields = false;

    // marketable variables
    products: Product[] = [];
    categories: Category[] = [];
    sections: Section[] = [];
    productTypes: ProductType[] = [];
    priceTypes: PriceType[] = [];
    productClassTaxes: ProductClassTax[] = [];

    // stocks
    displayedColumns = ['warehouse_id', 'warehouse_name', 'stock', 'minimum_stock', 'actions'];
    stocksData: any[] = [];
    dataSource = new MatTableDataSource();
    @ViewChild(MatSort) sort: MatSort;
    dialog: MatDialog;

    constructor(
        protected injector: Injector,
        public graphQL: ProductGraphQLService,
        private graphQLStock: StockGraphQLService,
        private _marketable: MarketableService
    ) {
        super(injector, graphQL);
    }

    ngOnInit(): void
    {
        super.ngOnInit();
        if (this.dataRoute.action === 'create')
        {
            // allow start dh2-dynamic-form component to avoid failures in the JWT
            this.startCustomFields = true;
        }
    }
    
    createForm(): void
    {
        this.fg = this.fb.group({
            ix: null,
            id: [{value: null, disabled: true}],
            field_group_id: null,
            description: null,
            attachments: this.fb.array([])
        });
    }

    disabledForm(): void
    {
        this.fg.controls['sku'].disable();
        this.fg.controls['categories_id'].disable();
        this.fg.controls['sections_id'].disable();
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

    afterSetData(): void
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
                value: this.params['lang_id'] ? this.params['lang_id'] : this.baseLang
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'market_section.name'
            }
        ];

        const sqlAttachmentFamily = [
            {
                command: 'where',
                column: 'admin_attachment_family.resource_id',
                operator: '=',
                value: 'market-product'
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'admin_attachment_family.name'
            }
        ];

        const sqlProduct = [
            {
                command: 'where',
                column: 'market_product_lang.lang_id',
                operator: '=',
                value: this.params['lang_id'] ? this.params['lang_id'] : this.baseLang
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'market_product.sort'
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
            sqlSection,
            sqlAttachmentFamily,
            sqlProduct,
            sqlFieldGroup,
            sqlStock,
            configProductTypes,
            configPriceTypes
        };
    }

    setRelationsData(data: any): void
    {
        // market product types
        this.productTypes = data.marketProductTypes;

        // market price types
        this.priceTypes = data.marketPriceTypes;

        // market product class taxes
        this.productClassTaxes = data.marketProductClassTaxes;

        // market category
        this.categories = data.marketCategories;

        // market product section
        this.sections = data.marketSections;

        // market admin field groups
        this.fieldGroups = data.adminFieldGroups;

        // market products
        this.products = data.marketProducts;

        // admin attachment families
        this.attachmentFamilies = data.adminAttachmentFamilies;

        // only set ware house in edit action
        if (this.dataRoute.action === 'edit')
        {
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
        }

        this.dataSource.sort = this.sort;
        this.dataSource.data = this.stocksData;
    }

    afterPatchValueEdit(): void
    {
        // set market categories extracting ids
        this.fg.controls['categories_id'].setValue(_.map(this.object.categories, 'id'));

        // set market sections extracting ids
        this.fg.controls['sections_id'].setValue(_.map(this.object.sections, 'id'));

        this._marketable.handleGetProductTaxes(
            this.fg,
            this.fg.get('subtotal').value,
            true, // force to calulate price without tax
            () => { // callback, all http petition must to be sequential to pass JWT
                // allow start dh2-dynamic-form component to avoid failures in the JWT
                this.startCustomFields = true;
            }
        );
    }

    editStock(stockData: any): void
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
