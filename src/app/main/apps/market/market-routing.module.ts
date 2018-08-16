import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationService } from './../../core/services/authorization.service';

import { CartPriceRuleListComponent } from './cart-price-rule/cart-price-rule-list.component';
import { CartPriceRuleDetailComponent } from './cart-price-rule/cart-price-rule-detail.component';
import { CategoryListComponent } from './category/category-list.component';
import { CategoryDetailComponent } from './category/category-detail.component';
import { CustomerClassTaxListComponent } from './customer-class-tax/customer-class-tax-list.component';
import { CustomerClassTaxDetailComponent } from './customer-class-tax/customer-class-tax-detail.component';
import { CustomerGroupCustomerClassTaxListComponent } from './customer-group-customer-class-tax/customer-group-customer-class-tax-list.component';
import { CustomerGroupCustomerClassTaxDetailComponent } from './customer-group-customer-class-tax/customer-group-customer-class-tax-detail.component';
import { OrderListComponent } from './order/order-list.component';
import { OrderDetailComponent } from './order/order-detail.component';
import { OrderStatusListComponent } from './order-status/order-status-list.component';
import { OrderStatusDetailComponent } from './order-status/order-status-detail.component';
import { PaymentMethodListComponent } from './payment-method/payment-method-list.component';
import { PaymentMethodDetailComponent } from './payment-method/payment-method-detail.component';
import { ProductListComponent } from './product/product-list.component';
import { ProductDetailComponent } from './product/product-detail.component';
import { ProductClassTaxListComponent } from './product-class-tax/product-class-tax-list.component';
import { ProductClassTaxDetailComponent } from './product-class-tax/product-class-tax-detail.component';
import { SectionListComponent } from './section/section-list.component';
import { SectionDetailComponent } from './section/section-detail.component';
import { TaxRateZoneListComponent } from './tax-rate-zone/tax-rate-zone-list.component';
import { TaxRateZoneDetailComponent } from './tax-rate-zone/tax-rate-zone-detail.component';
import { TaxRuleListComponent } from './tax-rule/tax-rule-list.component';
import { TaxRuleDetailComponent } from './tax-rule/tax-rule-detail.component';
import { WarehouseListComponent } from './warehouse/warehouse-list.component';
import { WarehouseDetailComponent } from './warehouse/warehouse-detail.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthorizationService],
        children: [
            // Orders
            { path: 'order',                                                            component: OrderListComponent },
            { path: 'order/create',                                                     component: OrderDetailComponent,                            data: { action: 'create' }},
            { path: 'order/show/:id',                                                   component: OrderDetailComponent,                            data: { action: 'edit' }},

            // Products
            { path: 'product',                                                          component: ProductListComponent },
            { path: 'product/create',                                                   component: ProductDetailComponent,                          data: { action: 'create' }},
            { path: 'product/create/:lang_id/:id',                                      component: ProductDetailComponent,                          data: { action: 'create-lang' }},
            { path: 'product/show/:lang_id/:id',                                        component: ProductDetailComponent,                          data: { action: 'edit' }},

            // Categories
            { path: 'category',                                                         component: CategoryListComponent },
            { path: 'category/create',                                                  component: CategoryDetailComponent,                         data: { action: 'create' }},
            { path: 'category/create/:lang_id/:id',                                     component: CategoryDetailComponent,                         data: { action: 'create-lang' }},
            { path: 'category/show/:lang_id/:id',                                       component: CategoryDetailComponent,                         data: { action: 'edit' }},

            // Sections
            { path: 'section',                                                          component: SectionListComponent },
            { path: 'section/create',                                                   component: SectionDetailComponent,                          data: { action: 'create' }},
            { path: 'section/show/:id',                                                 component: SectionDetailComponent,                          data: { action: 'edit' }},

            // Cart Price rules
            { path: 'marketing/cart-price-rule',                                        component: CartPriceRuleListComponent },
            { path: 'marketing/cart-price-rule/create',                                 component: CartPriceRuleDetailComponent,                    data: { action: 'create' }},
            { path: 'marketing/cart-price-rule/create/:lang_id/:id',                    component: CartPriceRuleDetailComponent,                    data: { action: 'create-lang' }},
            { path: 'marketing/cart-price-rule/show/:lang_id/:id',                      component: CartPriceRuleDetailComponent,                    data: { action: 'edit' }},

            // Order Statuses
            { path: 'order-status',                                                     component: OrderStatusListComponent },
            { path: 'order-status/create',                                              component: OrderStatusDetailComponent,                      data: { action: 'create' }},
            { path: 'order-status/create/:lang_id/:id',                                 component: OrderStatusDetailComponent,                      data: { action: 'create-lang' }},
            { path: 'order-status/show/:lang_id/:id',                                   component: OrderStatusDetailComponent,                      data: { action: 'edit' }},

            // Payment Methods
            { path: 'payment-method',                                                   component: PaymentMethodListComponent },
            { path: 'payment-method/create',                                            component: PaymentMethodDetailComponent,                    data: { action: 'create' }},
            { path: 'payment-method/create/:lang_id/:id',                               component: PaymentMethodDetailComponent,                    data: { action: 'create-lang' }},
            { path: 'payment-method/show/:lang_id/:id',                                 component: PaymentMethodDetailComponent,                    data: { action: 'edit' }},

            // Customer Class Taxes
            { path: 'taxes/customer-class-tax',                                         component: CustomerClassTaxListComponent },
            { path: 'taxes/customer-class-tax/create',                                  component: CustomerClassTaxDetailComponent,                 data: { action: 'create' }},
            { path: 'taxes/customer-class-tax/show/:id',                                component: CustomerClassTaxDetailComponent,                 data: { action: 'edit' }},

            // Customer Group Customer Class Tax
            { path: 'taxes/customer-group-customer-class-tax',                          component: CustomerGroupCustomerClassTaxListComponent },
            { path: 'taxes/customer-group-customer-class-tax/create',                   component: CustomerGroupCustomerClassTaxDetailComponent,    data: { action: 'create' }},
            { path: 'taxes/customer-group-customer-class-tax/show/:group_id/:tax_id',   component: CustomerGroupCustomerClassTaxDetailComponent,    data: { action: 'edit' }},

            // Product Class Taxes
            { path: 'taxes/product-class-tax',                                          component: ProductClassTaxListComponent },
            { path: 'taxes/product-class-tax/create',                                   component: ProductClassTaxDetailComponent,                  data: { action: 'create' }},
            { path: 'taxes/product-class-tax/show/:id',                                 component: ProductClassTaxDetailComponent,                  data: { action: 'edit' }},

            // Tax Rate Zone
            { path: 'taxes/tax-rate-zone',                                              component: TaxRateZoneListComponent },
            { path: 'taxes/tax-rate-zone/create',                                       component: TaxRateZoneDetailComponent,                      data: { action: 'create' }},
            { path: 'taxes/tax-rate-zone/show/:id',                                     component: TaxRateZoneDetailComponent,                      data: { action: 'edit' }},

            // Tax Rule
            { path: 'taxes/tax-rule',                                                   component: TaxRuleListComponent },
            { path: 'taxes/tax-rule/create',                                            component: TaxRuleDetailComponent,                          data: { action: 'create' }},
            { path: 'taxes/tax-rule/show/:id',                                          component: TaxRuleDetailComponent,                          data: { action: 'edit' }},

            // Warehouses
            { path: 'warehouse',                                                        component: WarehouseListComponent },
            { path: 'warehouse/create',                                                 component: WarehouseDetailComponent,                        data: { action: 'create' }},
            { path: 'warehouse/show/:id',                                               component: WarehouseDetailComponent,                        data: { action: 'edit' }},
        ]  
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MarketRoutingModule {}
