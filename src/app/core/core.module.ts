import { NgModule, Optional, SkipSelf } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';
import { GraphqlModule } from './graphql/graphql.module';
import { ValidationMessageService } from './services/validation-message.service';
export const REGEXP = /.*/;

@NgModule({
    imports: [
        ServicesModule,
        GraphqlModule,
        AuthModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: () => {
                    return localStorage.getItem('access_token');
                },
                whitelistedDomains: [REGEXP]
            }
        })
    ],
    exports: [ServicesModule],
    declarations: [],
    providers: [
        ValidationMessageService
    ],
})
export class CoreModule {
    constructor(
        @Optional() @SkipSelf() parentModule: CoreModule
    ) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
