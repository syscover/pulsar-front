import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '@horus/foundations/core-detail-component';
import { Profile, Gender, Availability, Category, TeacherTraining } from '../forem.models';
import { graphQL } from './trainer.graphql';
import { Country } from '../../admin/admin.models';

@Component({
    selector: 'dh2-forem-trainer-detail',
    templateUrl: 'trainer-detail.component.html',
    animations: fuseAnimations
})
export class TrainerDetailComponent extends CoreDetailComponent  implements OnInit
{
    objectTranslation = 'FOREM.TRAINER';
    objectTranslationGender = 'M';
    profiles: Profile[] = [];
    genders: Gender[] = [];
    availabilities: Availability[] = [];
    countries: Country[] = [];
    categories: Category[] = [];
    teacherTrainings: TeacherTraining[] = [];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            profile_id: ['', Validators.required],
            name: ['', Validators.required],
            surname: '',
            surname2: '',
            gender_id: '',
            birth_date: '',
            tin: '',
            email: '',
            phone: '',
            mobile: '',
            has_communication: false,
            has_authorization: false,
            availabilities: [],

            // geolocation
            address: '',
            country_id: '',
            territorial_area_1_id: '',
            territorial_area_2_id: '',
            territorial_area_3_id: '',
            zip: '',
            locality: '',
            latitude: '',
            longitude: '',

            is_register_jccm: false,
            specialty: '',
            categories: [],
            teacher_training: '',
            teaching_months: '',
            occupation_months: '',
            description: ''
        });
    }

    argumentsRelationsObject(): object
    {
        const sqlAdminCountry = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: this.params['lang'] ? this.params['lang'] : this.baseLang.id
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'admin_country.name'
            }
        ];

        const configGenders = {
            key: 'pulsar-forem.genders'
        };

        const configAvailabilities = {
            key: 'pulsar-forem.availabilities'
        };

        const configTeacherTrainings = {
            key: 'pulsar-forem.teacher_trainings'
        };

        return {
            sqlAdminCountry,
            configGenders,
            configAvailabilities,
            configTeacherTrainings
        };
    }

    setRelationsData(data: any): void
    {
        // set admin countries
        this.countries = data.adminCountries;

        // profiles
        this.profiles = data.foremProfiles;

        // categories
        this.categories = data.foremCategories;

        // set genders
        this.genders = data.foremGenders;

        // set availabilities
        this.availabilities = data.foremAvailabilities;

        // set teacher trainings
        this.teacherTrainings = data.foremTeacherTrainings;
    }
}
