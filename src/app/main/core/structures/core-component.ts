import { Injector, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Core } from './core';
import { HttpService } from './../services/http.service';
import { GraphQLSchema } from './graphql-schema';
import { Lang } from './../../apps/admin/admin.models';
import { ConfirmationDialogComponent } from './../components/confirmation-dialog.component';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

export abstract class CoreComponent extends Core implements OnInit, OnDestroy
{
    loadingButton = false;
    loadingTranslationButton = false;
    translateService: TranslateService;
    baseUri: string;                            // baseUri to set component urls in templete, this property must to be public because is used in template
    baseLang: string;                           // base languague of application, this variable is required for multi-language objects
    packagePath: string;                        // path of package and resource
    resourcePath: string;
    objectTranslation: string;                  // translation key from current object
    objectTranslationGender: string;
    objectTranslationTranslated: string;        // string translated from current object

    protected router: Router;
    protected route: ActivatedRoute;
    protected httpService: HttpService;
    protected params: Params;
    protected langs: Lang[];                    // activated application lang
    protected snackBar: MatSnackBar;
    protected translations: Object = {};        // translations for used in component
    protected dialog: MatDialog;
    protected ngUnsubscribe = new Subject();    // create Observable to unsubscribe

    constructor(
        protected injector: Injector,
        protected graphQL: GraphQLSchema,
    ) {
        super(injector);

        this.router = this.injector.get(Router);
        this.route = this.injector.get(ActivatedRoute);
        this.httpService = this.injector.get(HttpService);
        this.translateService = this.injector.get(TranslateService);
        this.snackBar = this.injector.get(MatSnackBar);
        this.dialog = this.injector.get(MatDialog);

        // set object properties
        this.setBaseUri();
        this.params = this.route.snapshot.params;
        this.langs = this.configService.get('langs');
        this.baseLang = this.configService.get('base_lang');
    }

    ngOnInit(): void
    {
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

    ngOnDestroy() 
    {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
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
                // apperar spinner in delete translate button
                this.loadingTranslationButton = true;

                this.httpService
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
    getCustomArgumentsDeleteRecord(object: any, args: Object): Object { return args; }
}
