import { Component, Input, OnInit, EventEmitter, ViewChild, Inject, forwardRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/primeng';
import { MainLayoutComponent } from './../main-layout/main-layout.component';

@Component({
    selector: 'ps-menu',
    styles: [`
        :host{
            font-size: 16px;
            line-height: 1.5em;
        }
    `],
    template: `
        <ul ps-submenu [item]="model" root="true" class="ultima-menu ultima-main-menu clearfix" [reset]="reset" visible="true"></ul>
    `
})
export class MenuComponent implements OnInit {

    @Input() reset: boolean;

    model: any[];

    constructor(@Inject(forwardRef(() => MainLayoutComponent)) public app: MainLayoutComponent) {}

    ngOnInit() {
        this.model = [
            {label: 'Dashboard', icon: 'dashboard', routerLink: ['/']},
            {
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
            },
            {
                label: 'CRM', icon: 'supervisor_account',
                items: [
                    {label: 'Customers', icon: 'face', routerLink: ['/pulsar/crm/customer']},
                    {label: 'Groups', icon: 'crop_free', routerLink: ['/pulsar/crm/group']}
                ]
            },
            {
                label: 'Administration', icon: 'settings',
                items: [
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
                        label: 'Permissions', icon: 'fingerprint',
                        items: [
                            {label: 'Actions', icon: 'flash_on', routerLink: ['/pulsar/admin/action']},
                            {label: 'Profiles', icon: 'supervisor_account', routerLink: ['/pulsar/admin/profile']},
                        ]
                    }
                ]
            }
        ];
    }

    changeTheme(theme) {
        let themeLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('theme-css');
        let layoutLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('layout-css');

        themeLink.href = 'assets/theme/theme-' + theme + '.css';
        layoutLink.href = 'assets/layout/css/layout-' + theme + '.css';
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
                    (click)="itemClick($event,child,i)" 
                    class="ripplelink" 
                    [attr.tabindex]="!visible ? '-1' : null" 
                    [attr.target]="child.target">
                    <i class="material-icons">{{child.icon}}</i>
                    <span>{{child.label}}</span>
                    <i class="material-icons" *ngIf="child.items">keyboard_arrow_down</i>
                </a>

                <a  *ngIf="child.routerLink"
                    (click)="itemClick($event,child,i)" 
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
        @Inject(forwardRef(() => MainLayoutComponent))
        public app: MainLayoutComponent,
        public router: Router,
        public location: Location
    ) {}

    itemClick(event: Event, item: MenuItem, index: number) {
        //avoid processing disabled items
        if(item.disabled) {
            event.preventDefault();
            return true;
        }

        //activate current item and deactivate active sibling if any
        this.activeIndex = (this.activeIndex === index) ? null : index;

        //execute command
        if (item.command) {
            if (!item.eventEmitter) {
                item.eventEmitter = new EventEmitter();
                item.eventEmitter.subscribe(item.command);
            }

            item.eventEmitter.emit({
                originalEvent: event,
                item: item
            });
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

    set reset(val:boolean) {
        this._reset = val;

        if (this._reset && this.app.isHorizontal()) {
            this.activeIndex = null;
        }
    }

}
