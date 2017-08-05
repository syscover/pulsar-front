import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataContainerComponent } from './../shared/components/data-container/data-container.component';
import { ErrorComponent } from './../shared/components/errors/error.component';
import { AuthGuard } from './../core/auth/auth-guard.service';

/* import { CategoryListComponent } from './category/category-list.component';
import { CategoryDetailComponent } from './category/category-detail.component';*/
import { CustomerClassTaxDetailComponent } from './customer-class-tax/customer-class-tax-detail.component';
import { CustomerClassTaxListComponent } from './customer-class-tax/customer-class-tax-list.component';
import { GroupCustomerClassTaxDetailComponent } from './group-customer-class-tax/group-customer-class-tax-detail.component';
import { GroupCustomerClassTaxListComponent } from './group-customer-class-tax/group-customer-class-tax-list.component';
import { PaymentMethodDetailComponent } from './payment-method/payment-method-detail.component';
import { PaymentMethodListComponent } from './payment-method/payment-method-list.component';
import { OrderStatusDetailComponent } from './order-status/order-status-detail.component';
import { OrderStatusListComponent } from './order-status/order-status-list.component';
import { ProductClassTaxDetailComponent } from './product-class-tax/product-class-tax-detail.component';
import { ProductClassTaxListComponent } from './product-class-tax/product-class-tax-list.component';
import { TaxRateZoneDetailComponent } from './tax-rate-zone/tax-rate-zone-detail.component';
import { TaxRateZoneListComponent } from './tax-rate-zone/tax-rate-zone-list.component';
import { TaxRuleDetailComponent } from './tax-rule/tax-rule-detail.component';
import { TaxRuleListComponent } from './tax-rule/tax-rule-list.component';
/* 
import { ProductListComponent } from './product/product-list.component';
import { ProductDetailComponent } from './product/product-detail.component'; */

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        children: [
            {
                path: '',                                                   component: DataContainerComponent,
                canActivateChild: [AuthGuard],
                children: [
                    // Categories
                    /* { path: 'category',                                     component: CategoryListComponent },
                    { path: 'category/create',                              component: CategoryDetailComponent,                     data: { action: 'create' }},
                    { path: 'category/create/:id/:lang',                    component: CategoryDetailComponent,                     data: { action: 'create-lang' }},
                    { path: 'category/show/:id/:lang',                      component: CategoryDetailComponent,                     data: { action: 'edit' }},
                     */

                    // Group Customer Class Tax
                    { path: 'group-customer-class-tax',                     component: GroupCustomerClassTaxListComponent },
                    { path: 'group-customer-class-tax/create',              component: GroupCustomerClassTaxDetailComponent,        data: { action: 'create' }},
                    { path: 'group-customer-class-tax/show/:grId/:txId',    component: GroupCustomerClassTaxDetailComponent,        data: { action: 'edit' }},

                    // Product Class Tax
                    { path: 'product-class-tax',                            component: ProductClassTaxListComponent },
                    { path: 'product-class-tax/create',                     component: ProductClassTaxDetailComponent,              data: { action: 'create' }},
                    { path: 'product-class-tax/show/:id',                   component: ProductClassTaxDetailComponent,              data: { action: 'edit' }},

                    // Customer Class Tax
                    { path: 'customer-class-tax',                           component: CustomerClassTaxListComponent },
                    { path: 'customer-class-tax/create',                    component: CustomerClassTaxDetailComponent,             data: { action: 'create' }},
                    { path: 'customer-class-tax/show/:id',                  component: CustomerClassTaxDetailComponent,             data: { action: 'edit' }},

                    // Order Status
                    { path: 'order-status',                                 component: OrderStatusListComponent },
                    { path: 'order-status/create',                          component: OrderStatusDetailComponent,                  data: { action: 'create' }},
                    { path: 'order-status/create/:id/:lang',                component: OrderStatusDetailComponent,                  data: { action: 'create-lang' }},
                    { path: 'order-status/show/:id/:lang',                  component: OrderStatusDetailComponent,                  data: { action: 'edit' }},

                    // Payment Method
                    { path: 'payment-method',                               component: PaymentMethodListComponent },
                    { path: 'payment-method/create',                        component: PaymentMethodDetailComponent,                data: { action: 'create' }},
                    { path: 'payment-method/create/:id/:lang',              component: PaymentMethodDetailComponent,                data: { action: 'create-lang' }},
                    { path: 'payment-method/show/:id/:lang',                component: PaymentMethodDetailComponent,                data: { action: 'edit' }},

                    // Tax Rate Zone
                    { path: 'tax-rate-zone',                                component: TaxRateZoneListComponent },
                    { path: 'tax-rate-zone/create',                         component: TaxRateZoneDetailComponent,                  data: { action: 'create' }},
                    { path: 'tax-rate-zone/show/:id',                       component: TaxRateZoneDetailComponent,                  data: { action: 'edit' }},

                    // Tax Rule
                    { path: 'tax-rule',                                     component: TaxRuleListComponent },
                    { path: 'tax-rule/create',                              component: TaxRuleDetailComponent,                      data: { action: 'create' }},
                    { path: 'tax-rule/show/:id',                            component: TaxRuleDetailComponent,                      data: { action: 'edit' }},

                    /* // Products
                    { path: 'product',                                      component: ProductListComponent },
                    { path: 'product/create',                               component: ProductDetailComponent,                      data: { action: 'create' }},
                    { path: 'product/create/:id/:lang',                     component: ProductDetailComponent,                      data: { action: 'create-lang' }},
                    { path: 'product/show/:id/:lang',                       component: ProductDetailComponent,                      data: { action: 'edit' }}, */

                    // Wildcard route
                    { path: '**',                                           component: ErrorComponent,                              data: { error: '404' }}
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MarketRoutingModule {}
