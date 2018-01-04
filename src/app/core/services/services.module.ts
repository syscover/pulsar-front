import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BootstrapService } from './bootstrap.service';
import { HttpInterceptorService } from './http-interceptor.service';
import { ConfigService } from './config.service';

export function BootstrapLoader(bootstrapService: BootstrapService) {
    return () => bootstrapService.load();
}

@NgModule({
    imports: [
        HttpClientModule
    ],
    exports: [],
    declarations: [],
    providers: [
        BootstrapService,
        ConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: BootstrapLoader,
            deps: [BootstrapService],
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true
        }
    ],
})
export class ServicesModule { }
