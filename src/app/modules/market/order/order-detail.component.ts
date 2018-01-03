import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../../core/super/core-detail.component';
import { OrderGraphQLService } from './order-graphql.service';
import { SelectItem } from 'primeng/primeng';
import { Order, OrderRow, OrderStatus } from './../market.models';
import * as _ from 'lodash';

@Component({
    selector: 'ps-order-detail',
    templateUrl: './order-detail.component.html'
})
export class OrderDetailComponent extends CoreDetailComponent {

    // set empty object, overwritte object to be used in this class
    object: Order = new Order();

    orderRows: OrderRow[] = [];
    statuses: SelectItem[] = [];
    paymentMethods: SelectItem[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: OrderGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}, Validators.required ],
            date: [{value: '', disabled: true}, Validators.required ],
            status_id: ['', Validators.required],
            ip: [{value: '', disabled: true}, Validators.required ],
            payment_method_id: ['', Validators.required],
            transaction_id: [{value: '', disabled: true}],
            customer_company: null,
            customer_tin: null,
            customer_name: null,
            customer_surname: null,
            customer_email: null,
            customer_mobile: null,


            shipping_amount: [{value: '', disabled: true}],
            subtotal: [{value: '', disabled: true}],
            total: [{value: '', disabled: true}],
        });
    }

    beforePatchValueEdit() {
        // create copy object for change readonly properties
        let objectInput = Object.assign({}, this.object);

        // change date format to Date, for calendar component
        objectInput['date'] = new Date(this.object.date);

        this.object = objectInput;
    }

    setRelationsData(data) {

        // market order rows
        this.orderRows = <OrderRow[]>data['coreObject']['rows'];

        // market order statuses
        this.statuses = _.filter(<OrderStatus[]>data['marketOrderStatuses'], obj => {
            return obj.lang_id === this.baseLang;
        }).map(obj => {
           return { value: obj.id, label: obj.name };
        });
        this.statuses.unshift({ label: 'Select a order status', value: '' });

        // market payment methods
        this.paymentMethods = _.filter(<OrderStatus[]>data['marketPaymentMethods'], obj => {
            return obj.lang_id === this.baseLang;
        }).map(obj => {
           return { value: obj.id, label: obj.name };
        });
        this.statuses.unshift({ label: 'Select a payment mehod', value: '' });

        /* // cms sections
        this._sections = data['cmsSections'];
        this.sections = _.map(this._sections, obj => {
            return { value: obj.id, label: obj.name };
        });
        this.sections.unshift({ label: 'Select a section', value: '' });

        // cms families
        this._families = data['cmsFamilies'];
        this.families = _.map(this._families, obj => {
            return { value: obj.id, label: obj.name };
        });
        this.families.unshift({ label: 'Select a family', value: '' });

        // cms categories
        this.categories = _.map(<Category[]>data['cmsCategories'], obj => {
            return { value: obj.id, label: obj.name };
        });

        // cms statuses
        this.statuses = _.map(<Status[]>data['cmsStatuses'], obj => {
            return { value: obj.id, label: obj.name };
        });
        this.statuses.unshift({ label: 'Select a status', value: '' });

        // admin attachment families
        this._attachment_families = <AttachmentFamily[]>data['adminAttachmentFamilies'];
        this.attachmentFamilies = this._attachment_families;

        // Images styles for Froala
        for (let attachemntFamily of this.attachmentFamilies) {
            this.imageStyles['ps-attachment-family-' + attachemntFamily.id] = attachemntFamily.name;
        }

        // cms author
        this.user = this.authService.user();
        this.fg.patchValue({
            author_id: this.user.id,
            author_name: this.user.name + ' ' + this.user.surname
        });

        // cms articles
        this.articles = _.map(<Article[]>data['cmsArticles'], obj => {
            return { value: obj.id, label: obj.name };
        });
        this.articles.unshift({ label: 'Select a article', value: '' }); */
    }
}
