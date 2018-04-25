import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationService } from './../../core/services/authorization.service';

import { CustomerClassTaxListComponent } from './customer-class-tax/customer-class-tax-list.component';
import { CustomerClassTaxDetailComponent } from './customer-class-tax/customer-class-tax-detail.component';
import { OrderStatusListComponent } from './order-status/order-status-list.component';
import { OrderStatusDetailComponent } from './order-status/order-status-detail.component';
import { PaymentMethodListComponent } from './payment-method/payment-method-list.component';
import { PaymentMethodDetailComponent } from './payment-method/payment-method-detail.component';
import { ProductClassTaxListComponent } from './product-class-tax/product-class-tax-list.component';
import { ProductClassTaxDetailComponent } from './product-class-tax/product-class-tax-detail.component';



/*
        // Categories
        { path: 'category',                                     component: CategoryListComponent },
        { path: 'category/create',                              component: CategoryDetailComponent,                     data: { action: 'create' }},
        { path: 'category/create/:lang_id/:id',                 component: CategoryDetailComponent,                     data: { action: 'create-lang' }},
        { path: 'category/show/:lang_id/:id',                   component: CategoryDetailComponent,                     data: { action: 'edit' }},

        // Group Customer Class Tax
        { path: 'group-customer-class-tax',                     component: GroupCustomerClassTaxListComponent },
        { path: 'group-customer-class-tax/create',              component: GroupCustomerClassTaxDetailComponent,        data: { action: 'create' }},
        { path: 'group-customer-class-tax/show/:grId/:txId',    component: GroupCustomerClassTaxDetailComponent,        data: { action: 'edit' }},

        // Tax Rate Zone
        { path: 'tax-rate-zone',                                component: TaxRateZoneListComponent },
        { path: 'tax-rate-zone/create',                         component: TaxRateZoneDetailComponent,                  data: { action: 'create' }},
        { path: 'tax-rate-zone/show/:id',                       component: TaxRateZoneDetailComponent,                  data: { action: 'edit' }},

        // Tax Rule
        { path: 'tax-rule',                                     component: TaxRuleListComponent },
        { path: 'tax-rule/create',                              component: TaxRuleDetailComponent,                      data: { action: 'create' }},
        { path: 'tax-rule/show/:id',                            component: TaxRuleDetailComponent,                      data: { action: 'edit' }},

        // Products
        { path: 'product',                                      component: ProductListComponent },
        { path: 'product/create',                               component: ProductDetailComponent,                      data: { action: 'create' }},
        { path: 'product/create/:lang_id/:id',                  component: ProductDetailComponent,                      data: { action: 'create-lang' }},
        { path: 'product/show/:lang_id/:id',                    component: ProductDetailComponent,                      data: { action: 'edit' }},

        // Cart Price rules
        { path: 'cart-price-rule',                              component: CartPriceRuleListComponent },
        { path: 'cart-price-rule/create',                       component: CartPriceRuleDetailComponent,                data: { action: 'create' }},
        { path: 'cart-price-rule/create/:lang_id/:id',          component: CartPriceRuleDetailComponent,                data: { action: 'create-lang' }},
        { path: 'cart-price-rule/show/:lang_id/:id',            component: CartPriceRuleDetailComponent,                data: { action: 'edit' }},

        // Catalog rule

        // Warehouses
        { path: 'warehouse',                                    component: WarehouseListComponent },
        { path: 'warehouse/create',                             component: WarehouseDetailComponent,                    data: { action: 'create' }},
        { path: 'warehouse/show/:id',                           component: WarehouseDetailComponent,                    data: { action: 'edit' }},

        // Orders
        { path: 'order',                                        component: OrderListComponent },
        { path: 'order/create',                                 component: OrderDetailComponent,                        data: { action: 'create' }},
        { path: 'order/show/:id',                               component: OrderDetailComponent,                        data: { action: 'edit' }},
            
*/

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthorizationService],
        children: [
            // Order Statuses
            { path: 'order-status',                                 component: OrderStatusListComponent },
            { path: 'order-status/create',                          component: OrderStatusDetailComponent,                  data: { action: 'create' }},
            { path: 'order-status/create/:lang_id/:id',             component: OrderStatusDetailComponent,                  data: { action: 'create-lang' }},
            { path: 'order-status/show/:lang_id/:id',               component: OrderStatusDetailComponent,                  data: { action: 'edit' }},

            // Payment Methods
            { path: 'payment-method',                               component: PaymentMethodListComponent },
            { path: 'payment-method/create',                        component: PaymentMethodDetailComponent,                data: { action: 'create' }},
            { path: 'payment-method/create/:lang_id/:id',           component: PaymentMethodDetailComponent,                data: { action: 'create-lang' }},
            { path: 'payment-method/show/:lang_id/:id',             component: PaymentMethodDetailComponent,                data: { action: 'edit' }},

            // Customer Class Taxes
            { path: 'customer-class-tax',                           component: CustomerClassTaxListComponent },
            { path: 'customer-class-tax/create',                    component: CustomerClassTaxDetailComponent,             data: { action: 'create' }},
            { path: 'customer-class-tax/show/:id',                  component: CustomerClassTaxDetailComponent,             data: { action: 'edit' }},

            // Product Class Taxes
            { path: 'product-class-tax',                            component: ProductClassTaxListComponent },
            { path: 'product-class-tax/create',                     component: ProductClassTaxDetailComponent,              data: { action: 'create' }},
            { path: 'product-class-tax/show/:id',                   component: ProductClassTaxDetailComponent,              data: { action: 'edit' }},
        ]  
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MarketRoutingModule {}