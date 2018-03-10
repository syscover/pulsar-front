import { Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Core } from './core';
import { HttpService } from './../services/http.service';
import { GraphQLSchema } from './graphql-schema';
import { Lang } from './../../apps/admin/admin.models';
import { environment } from './../../../../../environments/environment';
import { FuseConfirmDialogComponent } from './../../../../core/components/confirm-dialog/confirm-dialog.component';


export abstract class CoreComponent extends Core 
{
    protected router: Router;
    protected route: ActivatedRoute;
    protected httpService: HttpService;
    protected translateService: TranslateService;
    protected params: Params;
    protected langs: Lang[];                        // activated application lang
    protected snackBar: MatSnackBar;
    protected translations: Object = {};            // translations for used in component
    protected dialog: MatDialog;

    // baseUri to set component urls in templete, this property must to be public because is used in template
    baseUri: string;
    // base languague of application, this variable is required for multi-language objects
    baseLang: string;

    // path of package and resource
    packagePath: string;
    resourcePath: string;

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

    protected setBaseUri(baseUri?: string) 
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

        let dialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            
            data: { 
                question: '¿quieres borrar el commponente tal y cual?'
            }
          });

        // confirm to delete object
        /* this.confirmationService.confirm({
            message: 'Are you sure that you want delete this object?',
            accept: () => {
                this.httpService
                    .apolloClient()
                    .mutate({
                        mutation: this.graphQL.mutationDeleteObject,
                        variables: args
                    })
                    .subscribe((response) => {
                        if (routeRedirect) 
                        {
                            this.router.navigate([routeRedirect]);
                        } 
                        else 
                        {
                            if (this.dataTable) 
                            {
                                // delete object and call onLazyLoad event on datatable
                                // to reload data
                                this.dataTable.onLazyLoad.emit(
                                    this.dataTable.createLazyLoadMetadata()
                                );
                            } 
                            else 
                            {
                                // list or deatail
                                this.router.navigate([this.baseUri]);
                            }
                        }
                    });
            }
        }); */
    }

    // method to be overwrite
    getCustomArgumentsDeleteRecord(object: any, args: Object): Object { return args; }
}
