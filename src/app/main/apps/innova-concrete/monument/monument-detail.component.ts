import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '../../../core/structures/core-detail-compoment';
import { AttachmentFamily, Country } from '../../admin/admin.models';
import { REINFORCEMENT_TYPES, ARCHITECTS, ARTISTS, ENGINEERS, OTHERS, Characteristic, People, CONCRETE_TYPES, FINISHES, CONSTRUCTION_MEETHODS, STRUCTURAL_TYPES } from '../innova-concrete.models';
import { graphQL } from './monument.graphql';
import * as _ from 'lodash';

@Component({
    selector: 'dh2-innova-concrete-monument-detail',
    templateUrl: 'monument-detail.component.html',
    animations: fuseAnimations
})
export class MonumentDetailComponent extends CoreDetailComponent  implements OnInit
{
    public objectTranslation = 'INNOVA.MONUMENT';
    public objectTranslationGender = 'M';
    public loadingSlug = false;
    public graphQL = graphQL;
    public countries: Country[] = [];
    public characteristics: Characteristic[] = [];
    public architects: People[] = [];
    public engineers: People[] = [];
    public artists: People[] = [];
    public others: People[] = [];
    public reinforcementTypes: Characteristic[] = [];
    public concreteTypes: Characteristic[] = [];
    public finishes: Characteristic[] = [];
    public constructionMethods: Characteristic[] = [];
    public structuralTypes: Characteristic[] = [];
    public attachmentFamilies: AttachmentFamily[] = [];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            original_name: '',
            current_name: ['', Validators.required],
            slug: ['', Validators.required],
            other_denominations: '',
            original_use: '',
            current_use: '',
            architects_id: [],
            engineers_id: [],
            artists_id: [],
            others_id: [],
            reinforcement_types_id: [],
            concrete_types_id: [],
            finishes_id: [],
            construction_methods_id: [],
            structural_types_id: [],
            commission: '',
            completion: '',
            rapporteur_name: '',
            rapporteur_email: '',
            rapporteur_date: '',
            percentage_progress: '',
            description: '',
            address: '',
            country_id: ['', Validators.required],
            province: '',
            locality: ['', Validators.required],
            zip: '',
            latitude: '',
            longitude: '',
            attachments: this.fb.array([])
        });
    }

    handleCheckingSlug($event): void
    {
        this.loadingSlug = $event;
    }

    argumentsRelationsObject(): object
    {
        const sqlCountry = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: this.params['lang'] ? this.params['lang'] : this.baseLang
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'admin_country.name'
            }
        ];

        const sqlAttachmentFamily = [
            {
                'command': 'where',
                'column': 'admin_attachment_family.resource_id',
                'operator': '=',
                'value': 'innova-monument'
            },
            {
                'command': 'orderBy',
                'operator': 'asc',
                'column': 'admin_attachment_family.name'
            }
        ];

        return {
            sqlCountry,
            sqlAttachmentFamily
        };
    }

    afterPatchValueEdit(): void
    {
        // peoples
        this.fg.get('architects_id').setValue(_.map(_.filter(this.object.peoples, {'group_id': ARCHITECTS}), 'id'));
        this.fg.get('engineers_id').setValue(_.map(_.filter(this.object.peoples, {'group_id': ENGINEERS}), 'id'));
        this.fg.get('artists_id').setValue(_.map(_.filter(this.object.peoples, {'group_id': ARTISTS}), 'id'));
        this.fg.get('others_id').setValue(_.map(_.filter(this.object.peoples, {'group_id': OTHERS}), 'id'));

        // characteristics
        this.fg.get('reinforcement_types_id').setValue(_.map(_.filter(this.object.characteristics, {'type_id': REINFORCEMENT_TYPES}), 'id'));
        this.fg.get('concrete_types_id').setValue(_.map(_.filter(this.object.characteristics, {'type_id': CONCRETE_TYPES}), 'id'));
        this.fg.get('finishes_id').setValue(_.map(_.filter(this.object.characteristics, {'type_id': FINISHES}), 'id'));
        this.fg.get('construction_methods_id').setValue(_.map(_.filter(this.object.characteristics, {'type_id': CONSTRUCTION_MEETHODS}), 'id'));
        this.fg.get('structural_types_id').setValue(_.map(_.filter(this.object.characteristics, {'type_id': STRUCTURAL_TYPES}), 'id'));
    }

    setRelationsData(data: any): void
    {
        // set admin countries
        this.countries = data.adminCountries;

        // set characteristics
        this.characteristics = data.innovaConcreteCharacteristics;

        // set architects
        this.architects = <People[]>_.filter(data.innovaConcretePeoples, {'group_id': ARCHITECTS});

        // set engineers
        this.engineers = <People[]>_.filter(data.innovaConcretePeoples, {'group_id': ENGINEERS});

        // set artists
        this.artists = <People[]>_.filter(data.innovaConcretePeoples, {'group_id': ARTISTS});

        // set others
        this.others = <People[]>_.filter(data.innovaConcretePeoples, {'group_id': OTHERS});

        // set reinforcement types
        this.reinforcementTypes = <Characteristic[]>_.filter(data.innovaConcreteCharacteristics, {'type_id': REINFORCEMENT_TYPES});

        // set concrete types
        this.concreteTypes = <Characteristic[]>_.filter(data.innovaConcreteCharacteristics, {'type_id': CONCRETE_TYPES});

        // set finishes
        this.finishes = <Characteristic[]>_.filter(data.innovaConcreteCharacteristics, {'type_id': FINISHES});

        // set construction methods
        this.constructionMethods = <Characteristic[]>_.filter(data.innovaConcreteCharacteristics, {'type_id': CONSTRUCTION_MEETHODS});

        // set structural Types
        this.structuralTypes = <Characteristic[]>_.filter(data.innovaConcreteCharacteristics, {'type_id': STRUCTURAL_TYPES});

        // admin attachment families
        this.attachmentFamilies = data.adminAttachmentFamilies;
    }
}
