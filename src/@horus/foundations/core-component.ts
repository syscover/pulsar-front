import { Injector, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Core } from '@horus/foundations/core';
import { HttpService } from '@horus/services/http.service';
import { ConfirmationDialogComponent } from '@horus/components/confirmation-dialog/confirmation-dialog.component';
import { Lang } from '@horus/types/lang';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { DataRoute } from '@horus/types/data-route';
import { horusConfig } from 'app/horus-config';

export abstract class CoreComponent extends Core implements OnInit, OnDestroy
{
    horusConfig = horusConfig;
    loadingButton = false;
    loadingTranslationButton = false;
    showSpinner = false;
    translateService: TranslateService;
    baseUri: string;                            // baseUri to set component urls in template, this property must to be public because is used in template
    baseLang: Lang;                             // base language of application, this variable is required for multi-language objects
    packagePath: string;                        // path of package and resource
    resourcePath: string;
    objectTranslation: string;                  // translation key from current object
    objectTranslationGender: string;
    objectTranslationTranslated: string;        // string translated from current object
    dataRoute: DataRoute;                       // static dataRoute Object pass from route module

    protected router: Router;
    protected route: ActivatedRoute;
    protected http: HttpService;
    protected params: Params;
    protected langs: Lang[];                    // activated application lang
    protected snackBar: MatSnackBar;
    protected translations: object = {};        // translations for used in component
    protected dialog: MatDialog;
    protected $onDestroy = new Subject();       // create Observable to unsubscribe

    constructor(
        protected injector: Injector,
        protected graphQL: any
    ) {
        super(injector);

        this.router = this.injector.get(Router);
        this.route = this.injector.get(ActivatedRoute);
        this.http = this.injector.get(HttpService);
        this.translateService = this.injector.get(TranslateService);
        this.snackBar = this.injector.get(MatSnackBar);
        this.dialog = this.injector.get(MatDialog);

        // set object properties
        this.setBaseUri();
        this.params = this.route.snapshot.params;
        this.langs = this.configService.get('langs');
        this.baseLang = this.configService.get('base_lang');
        this.dataRoute = <DataRoute>this.route.snapshot.data;   // set object properties
    }

    ngOnInit(): void
    {
        this.showSpinner = true;

        const keys = ['APPS'];
        if (this.objectTranslation) keys.push(this.objectTranslation);

        // load translations for component
        this.translateService
            .get(keys)
            .map(translations => {
                if (translations['APPS'])
                {
                    for (const index in translations['APPS'])
                    {
                        if (index) translations['APPS.' + index] = translations['APPS'][index];
                    }
                    delete translations.APPS;
                    return translations;
                }
            })
            .subscribe(response => {
                this.translations = Object.assign(this.translations, response);
            });
    }

    ngOnDestroy(): void
    {
        this.$onDestroy.next();
        this.$onDestroy.complete();
        if (this.env.debug) console.log('DEBUG - Core component destroyed');
    }

    protected setBaseUri(baseUri?: string): void
    {
        // compose baseUri from snapshot route if baseUri parameter is undefined
        if (! baseUri) 
        {
            if (this.route.snapshot.url) 
            {
                this.packagePath = this.route.snapshot.root.firstChild.firstChild.url[0].path;
                this.resourcePath = this.route.snapshot.url[0].path;

                this.baseUri = '/apps/' + this.route.snapshot.root.firstChild.firstChild.url[0].path + '/' + this.resourcePath;
            }
        } 
        else 
        {
            this.baseUri = baseUri;
        }
    }

    /**
     * @param object
     * @param args
     * @param routeRedirect
     */
    deleteRecord(object: any, args = {}, routeRedirect?: string): void 
    {
        // merge object properties with aditional arguments for send it to server
        object = Object.assign(args, object);

        // call method that can to be overwrite by children
        args = this.getCustomArgumentsDeleteRecord(object, object);

        if (this.env.debug) console.log('DEBUG - Args sending to delete object: ', args);

        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: { 
                title: this.translations['APPS.DELETE'] + ' ' + (this.objectTranslationTranslated ? this.objectTranslationTranslated : this.translations[this.objectTranslation])
            }
        });

        dialogRef.afterClosed().subscribe(result => {

            if (result) 
            {
                // appear spinner in delete translate button
                this.loadingTranslationButton = true;

                this.http
                    .apolloClient()
                    .mutate({
                        mutation: this.graphQL.mutationDeleteObject,
                        variables: args
                    })
                    .subscribe((response) => {
                        
                        // disappear spinner in delete translate button
                        this.loadingTranslationButton = false;

                        let snackBarMessage;

                        // set dialog message
                        if (this.objectTranslationTranslated)
                        {
                            snackBarMessage = (this.objectTranslationTranslated + ' ' + this.translations['APPS.DELETED.' + (this.objectTranslationGender ? this.objectTranslationGender : 'M')]).toLocaleLowerCase().capitalize();
                        }
                        else
                        {
                            snackBarMessage = (this.translations[this.objectTranslation] + ' ' + this.translations['APPS.DELETED.' + (this.objectTranslationGender ? this.objectTranslationGender : 'M')]).toLocaleLowerCase().capitalize();
                        }

                        this.snackBar.open(
                            snackBarMessage, 
                            this.translations['APPS.OK'], 
                            {
                                verticalPosition: 'top',
                                duration        : 3000
                            }
                        );

                        if (routeRedirect) 
                        {
                            this.router.navigate([routeRedirect]);
                        } 
                        else 
                        {
                            // check if has dataSource property to know if a CoreListComponent, intanceOf don't work by circular dependency error
                            if (this['filter'] && this['refreshTable']) 
                            {
                                // delete filter and refreshtable
                                this['filter'].nativeElement.value = '';
                                this['refreshTable'].next();
                            } 
                            else 
                            {
                                // list or deatail
                                this.router.navigate([this.baseUri]);
                            }
                        }
                    });
            }
        });
    }

    // method to be overwrite
    getCustomArgumentsDeleteRecord(object: any, args: object): object { return args; }
}
