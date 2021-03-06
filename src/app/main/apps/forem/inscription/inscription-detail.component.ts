import { Component, HostBinding, Injector, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { switchMap, debounceTime } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '@horus/foundations/core-detail-component';
import { AcademicLevel, AddressType, EmploymentOffice, EmploymentSituation, FunctionalArea, Gender, Group, Locality, ProfessionalCategory, Province, UnemployedSituation } from '../forem.models';
import { graphQL } from './inscription.graphql';
import { graphQL as foremLocalityGraphQL } from '../locality/locality.graphql';
import { empty } from 'rxjs/internal/observable/empty';

@Component({
    selector: 'dh2-forem-inscription-detail',
    templateUrl: 'inscription-detail.component.html',
    animations: fuseAnimations
})
export class InscriptionDetailComponent extends CoreDetailComponent  implements OnInit
{
    @HostBinding('style.color') color: string;

    objectTranslation = 'FOREM.INSCRIPTION';
    objectTranslationGender = 'F';
    loadingSlug = false;

    genders: Gender[] = [];
    addressTypes: AddressType[];
    groups: Group[] = [];
    provinces: Province[] = [];
    localities: Locality[] = [];

    localitiesAutocomplete: Locality[] = [];
    isLoadingLocalities = false;
    localityForm = new FormControl();

    employmentSituations: EmploymentSituation[] = [];
    unemployedSituations: UnemployedSituation[] = [];
    employmentOffices: EmploymentOffice[] = [];
    professionalCategories: ProfessionalCategory[] = [];
    functionalAreas: FunctionalArea[] = [];
    academicLevels: AcademicLevel[] = [];

    constructor(
        protected injector: Injector
    ) 
    {
        super(injector, graphQL);
    }

    ngOnInit(): void
    {
        super.ngOnInit();

        // autocomplete search locality
        this.localityForm
            .valueChanges
            .pipe(
                debounceTime(300),
                switchMap(value => 
                {
                    if (value.length > 3) 
                    {
                        this.isLoadingLocalities = true;
                        return this.http
                            .apolloClient()
                            .watchQuery({
                                query: foremLocalityGraphQL.queryObjects,
                                variables: {
                                    sql: [{
                                        command: 'where',
                                        column: 'forem_locality.name',
                                        operator: 'like',
                                        value: `%${value}%`
                                    }]
                                }
                            })
                            .valueChanges;
                    }
                    return empty();
                })
            )
            .subscribe(items => 
            {
                this.isLoadingLocalities = false;
                this.localitiesAutocomplete = items.data['coreObjects'];
            });
    }
    
    onSelected($event)
    {
        this.fg.get('locality_id').setValue($event.option.value.code);
        this.fg.get('locality_id').markAsDirty();
        this.fg.get('locality_id').markAsTouched();
    }

    displayFn(locality: Locality) 
    {
        if (locality) return locality.name;
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],

            // hidden
            is_exported: false,
            is_coursed: [{value: false, disabled: true}],
            student_id: '',
        
            group_id: ['', Validators.required],

            // Personal data
            name: ['', Validators.required],
            surname: '',
            surname2: '',
            gender_id: '',
            birth_date: '',
            tin: '',
            ssn: '',
            email: '',
            phone: '',
            mobile: '',
            address_type_id: '',
            address: '',
            province_id: '',
            zip: '',
            locality_id: '',

            has_agent: false,
            agent_name: '',
            agent_surname: '',
            agent_surname2: '',
            agent_tin: '',
            agent_address: '',
            agent_province_id: '',
            agent_zip: '',
            agent_locality_id: '',
            agent_email: '',
            agent_phone: '',
            agent_mobile: '',
            agent_contact_schedule: '',

            // knowledge
            academic_level_id: '',
            academic_level_specialty: ['', Validators.required],
            has_other_course: false,
            other_course: ['', Validators.required],

            // employment situation
            employment_situation_id: '',

            // unemployment data
            unemployed_registration_date: '',
            unemployed_situation_id: '',
            employment_office_id: '',

            // employment data
            professional_category_id: '',
            functional_area_id: '',
            worker_code: '',

            // company
            company_name: '',
            company_tin: '',
            company_sector: '',
            company_province_id: '',
            company_locality_id: '',
            company_address: '',
            company_zip: '',
            is_big_company: '',

            // FOCO
            code: '',

            // GRPD
            has_ssn_authorization: false,
            has_certification_authorization: false,
            has_data_authorization: false,
            has_marketing_authorization: false
        });
    }

    argumentsRelationsObject(): object
    {
        const configGenders = {
            key: 'pulsar-forem.genders'
        };

        const configAddressTypes = {
            key: 'pulsar-forem.address_types'
        };

        const configEmploymentSituations = {
            key: 'pulsar-forem.employment_situations'
        };

        const configUnemployedSituations = {
            key: 'pulsar-forem.unemployed_situations'
        };

        const configProfessionalCategories = {
            key: 'pulsar-forem.professional_categories'
        };

        const configFunctionalAreas = {
            key: 'pulsar-forem.functional_areas'
        };

        const configAcademicLevels = {
            key: 'pulsar-forem.academic_levels'
        };

        return {
            configGenders,
            configAddressTypes,
            configEmploymentSituations,
            configUnemployedSituations,
            configProfessionalCategories,
            configFunctionalAreas,
            configAcademicLevels
        };
    }

    setRelationsData(data: any): void
    {
        // set genders
        this.genders = data.foremGenders;

        // set groups
        this.groups = data.foremGroups;

        // set address types
        this.addressTypes = data.foremAddressTypes;

        // set employment situations
        this.employmentSituations = data.foremEmploymentSituations;

        // set unemployment situations
        this.unemployedSituations = data.foremUnemployedSituations;

        // set employment offices
        this.employmentOffices = data.foremEmploymentOffices;

        // set professional categories
        this.professionalCategories = data.foremProfessionalCategories;

        // set functional areas
        this.functionalAreas = data.foremFunctionalAreas;

        // set academic levels
        this.academicLevels = data.foremAcademicLevels;

        // set provinces
        this.provinces = data.foremProvinces;

        // set localities
        // this.localities = data.foremLocalities;
    }

    afterPatchValueEdit()
    {
        this.handleHasOtherCourse();
        this.localityForm.setValue(this.object.locality);
    }

    handleHasOtherCourse()
    {
        if (this.fg.get('has_other_course').value)
        {
            this.fg.get('other_course').setValidators(Validators.required);
        }
        else
        {
            this.fg.get('other_course').clearValidators();
        }
        this.fg.get('other_course').updateValueAndValidity();
    }

    handleChangeHasAgent($event): void
    {
        if ($event.checked)
        {
        }
        else
        {

        }
        console.log($event);
    }
}
