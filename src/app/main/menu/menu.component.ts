import { Component, Input, OnChanges, EventEmitter, Inject, forwardRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/primeng';
import { MainComponent } from './../main.component';
import { Package } from './../../admin/admin.models';
import * as _ from 'lodash';

@Component({
    selector: 'ps-menu',
    styles: [`
        :host{
            line-height: 1.5em;
        }
    `],
    template: `
        <ul ps-submenu 
                        [item]="model" 
                        root="true" 
                        class="ultima-menu ultima-main-menu clearfix" 
                        [reset]="reset" 
                        visible="true"></ul>
    `
})
export class MenuComponent implements OnChanges {

    @Input() reset: boolean;
    @Input() packages: Package[];

    model: any[] = [];

    constructor(
        @Inject(forwardRef(() => MainComponent)) public app: MainComponent
    ) { }

    ngOnChanges() {
        this.setMemu(this.packages);
    }

    setMemu(packages: Package[]) {
 
        // if packages is not defines yet
        if (! packages) { return; }

        let adminPackage    = _.find(packages, {root: 'admin'});
        let crmPackage      = _.find(packages, {root: 'crm'});
        let cmsPackage      = _.find(packages, {root: 'cms'});
        let marketPackage   = _.find(packages, {root: 'market'});

        this.model = [];
        this.model.push({ label: 'Dashboard', icon: 'dashboard', routerLink: ['/pulsar/admin/dashboard'] });

        if (cmsPackage && cmsPackage.active) {
            this.model.push({
                label: 'CMS', icon: 'art_track',
                items: [
                    {label: 'Articles', icon: 'art_track', routerLink: ['/pulsar/cms/article']},
                    {label: 'Categories', icon: 'list', routerLink: ['/pulsar/cms/category']},
                    {label: 'Sections', icon: 'power', routerLink: ['/pulsar/cms/section']},
                    {label: 'Families', icon: 'apps', routerLink: ['/pulsar/cms/family']},
                ]
            });
        }

        if (marketPackage && marketPackage.active) {
            this.model.push({
                label: 'Market', icon: 'shopping_cart',
                items: [
                    {
                        label: 'Catalog', icon: 'layers',
                        items: [
                            {label: 'Products', icon: 'view_day', routerLink: ['/pulsar/market/product']},
                            {label: 'Categories', icon: 'folder_open', routerLink: ['/pulsar/market/category']},
                        ]
                    },
                    {
                        label: 'Taxes', icon: 'keyboard_hide',
                        items: [
                            {label: 'Customer class taxes', icon: 'group', routerLink: ['/pulsar/market/customer-class-tax']},
                            {label: 'Groups customer', icon: 'group_work', routerLink: ['/pulsar/market/group-customer-class-tax']},
                            {label: 'Product class taxes', icon: 'view_agenda', routerLink: ['/pulsar/market/product-class-tax']},
                            {label: 'Tax rate zone', icon: 'blur_circular', routerLink: ['/pulsar/market/tax-rate-zone']},
                            {label: 'Tax rule', icon: 'traffic', routerLink: ['/pulsar/market/tax-rule']},
                        ]
                    },
                    {
                        label: 'Preferences', icon: 'settings',
                        items: [
                            {label: 'Payment methods', icon: 'credit_card', routerLink: ['/pulsar/market/payment-method']},
                            {label: 'Order status', icon: 'cached', routerLink: ['/pulsar/market/order-status']},
                        ]
                    }
                ]
            });
        }

        if (crmPackage && crmPackage.active) {
            this.model.push({
                label: 'CRM', icon: 'supervisor_account',
                items: [
                    {label: 'Customers', icon: 'face', routerLink: ['/pulsar/crm/customer']},
                    {label: 'Groups', icon: 'crop_free', routerLink: ['/pulsar/crm/group']},
                    {
                        label: 'Preferences', icon: 'settings',
                        items: [
                            {label: 'Address types', icon: 'map', routerLink: ['/pulsar/crm/type']}
                        ]
                    }
                ]
            });
        }

        if (adminPackage && adminPackage.active) {
            this.model.push({
                label: 'Administration', icon: 'settings',
                items: [
                    {label: 'Users', icon: 'group', routerLink: ['/pulsar/admin/user']},
                    {label: 'Languages', icon: 'translate', routerLink: ['/pulsar/admin/lang']},
                    {label: 'Countries', icon: 'public', routerLink: ['/pulsar/admin/country']},
                    {label: 'Packages', icon: 'view_comfy', routerLink: ['/pulsar/admin/package']},
                    {
                        label: 'Custom Fields', icon: 'flip_to_front',
                        items: [
                            {label: 'Fields', icon: 'list', routerLink: ['/pulsar/admin/field']},
                            {label: 'Field groups', icon: 'library_books', routerLink: ['/pulsar/admin/field-group']},
                        ]
                    },
                    {
                        label: 'Attachments', icon: 'attachment',
                        items: [
                            {label: 'Attachment families', icon: 'list', routerLink: ['/pulsar/admin/attachment-family']},
                            {label: 'Attachment mimes', icon: 'description', routerLink: ['/pulsar/admin/attachment-mime']},
                            {label: 'Attachment library', icon: 'library_books', routerLink: ['/pulsar/admin/field-group']},
                        ]
                    },
                    {
                        label: 'Permissions', icon: 'fingerprint',
                        items: [
                            {label: 'Actions', icon: 'flash_on', routerLink: ['/pulsar/admin/action']},
                            {label: 'Resources', icon: 'settings_input_component', routerLink: ['/pulsar/admin/resource']},
                            {label: 'Profiles', icon: 'supervisor_account', routerLink: ['/pulsar/admin/profile']},
                        ]
                    }
                ]
            });
        }
    }
}


@Component({
    selector: '[ps-submenu]',
    template: `
        <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
            <li *ngIf="child.visible === false ? false : true" 
                [ngClass]="{'active-menuitem': isActive(i)}">
                <a  *ngIf="!child.routerLink"
                    [href]="child.url||'#'"  
                    (click)="itemClick($event, child, i)" 
                    class="ripplelink" 
                    [attr.tabindex]="!visible ? '-1' : null" 
                    [attr.target]="child.target">
                    <i class="material-icons">{{child.icon}}</i>
                    <span>{{child.label}}</span>
                    <i class="material-icons" *ngIf="child.items">keyboard_arrow_down</i>
                </a>

                <a  *ngIf="child.routerLink"
                    (click)="itemClick($event, child, i)" 
                    class="ripplelink" 
                    [routerLink]="child.routerLink" 
                    routerLinkActive="active-menuitem-routerlink" 
                    [routerLinkActiveOptions]="{exact: true}" 
                    [attr.tabindex]="!visible ? '-1' : null" 
                    [attr.target]="child.target">
                    <i class="material-icons">{{child.icon}}</i>
                    <span>{{child.label}}</span>
                    <i class="material-icons" *ngIf="child.items">keyboard_arrow_down</i>
                </a>
                <ul ps-submenu [item]="child" *ngIf="child.items" [@children]="isActive(i) ? 'visible' : 'hidden'" [visible]="isActive(i)" [reset]="reset"></ul>
            </li>
        </ng-template>
    `,
    animations: [
        trigger('children', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class SubMenuComponent {

    @Input() item: MenuItem;
    @Input() root: boolean;
    @Input() visible: boolean;

    _reset: boolean;
    activeIndex: number;

    constructor(
        @Inject(forwardRef(() => MainComponent))
        public app: MainComponent,
        public router: Router
    ) {}

    itemClick(event: Event, item: MenuItem, index: number) {
        //avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        //activate current item and deactivate active sibling if any
        this.activeIndex = (this.activeIndex === index) ? null : index;

        //execute command
        if (item.command) {
            item.command({originalEvent: event, item: item});
        }

        //prevent hash change
        if (item.items || (!item.url && !item.routerLink)) {
            event.preventDefault();
        }

        //hide menu
        if (! item.items) {
            if (this.app.isHorizontal()) {
                this.app.resetMenu = true;
            } else {
                this.app.resetMenu = false;
            }

            this.app.overlayMenuActive = false;
            this.app.staticMenuMobileActive = false;
        }
    }

    isActive(index: number): boolean {
        return this.activeIndex === index;
    }

    @Input() get reset(): boolean {
        return this._reset;
    }

    set reset(val: boolean) {
        this._reset = val;

        if (this._reset && this.app.isHorizontal()) {
            this.activeIndex = null;
        }
    }
}
