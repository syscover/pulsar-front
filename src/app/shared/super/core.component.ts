import { Injector, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConfirmationService, DataTable } from 'primeng/primeng';
import { Core } from './core';
import { CoreService } from './core.service';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import { Lang } from './../../admin/admin.models';
import { environment } from './../../../environments/environment';

export class CoreComponent extends Core {

    // reference of datatable element of list views
    @ViewChild(('dataTableObjects')) dataTable: DataTable;

    protected router: Router;
    protected route: ActivatedRoute;
    protected objectService: CoreService;
    protected params: Params;
    protected langs: Lang[]; // Activated application lang
    protected confirmationService: ConfirmationService;

    // baseUri to set component urls in templete, this property must to be public because is used in template
    baseUri: string;
    // base languague of application, this variable is required for multi-language objects
    baseLang: string;

    // path of package and resource
    packagePath: string;
    resourcePath: string;

    constructor(
        protected injector: Injector,
        protected graphQL: GraphQLModel
    ) {
        super(injector);

        this.router = this.injector.get(Router);
        this.route = this.injector.get(ActivatedRoute);
        this.objectService = this.injector.get(CoreService);
        this.confirmationService = this.injector.get(ConfirmationService);

        // set object properties
        this.setBaseUri();
        this.params = this.route.snapshot.params;
        this.langs = this.configService.get('langs');
        this.baseLang = this.configService.get('base_lang');
    }

    protected setBaseUri(baseUri: string = undefined) {
        // compose baseUri from snapshot route if baseUri parameter is undefined
        if (! baseUri) {
            if (this.route.snapshot.url) {
                this.packagePath = this.route.snapshot.root.firstChild.firstChild.url[0].path;
                this.resourcePath = this.route.snapshot.url[0].path;

                this.baseUri = '/' + this.appPrefix + '/' + this.route.snapshot.root.firstChild.firstChild.url[0].path + '/' + this.resourcePath;
            }
        } else {
            this.baseUri = baseUri;
        }
    }

    /**
     * @param object
     * @param args
     * @param routeRedirect
     */
    deleteRecord(object: any, args = {}, routeRedirect: string = undefined): void {

        // merge object properties with aditional arguments for send it to server
        object = Object.assign(args, object);

        // call method that can to be overwrite by children
        args = this.getCustomArgumentsDeleteRecord(object, object);

        if (environment.debug) console.log('DEBUG - Args sending to delete object: ', args);

        // confirm to delete object
        this.confirmationService.confirm({
            message: 'Are you sure that you want delete this object?',
            accept: () => {
                this.objectService
                    .proxyGraphQL()
                    .mutate({
                        mutation: this.graphQL.mutationDeleteObject,
                        variables: args
                    })
                    .subscribe((response) => {

                        if (routeRedirect) {
                            this.router.navigate([routeRedirect]);
                        } else {
                            if (this.dataTable) {
                                // delete object and call onLazyLoad event on datatable
                                // to reload data
                                this.dataTable.onLazyLoad.emit(
                                    this.dataTable.createLazyLoadMetadata()
                                );
                            } else {
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
