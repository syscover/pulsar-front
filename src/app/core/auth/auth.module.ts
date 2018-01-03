import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { NgModule } from '@angular/core';

@NgModule({
    providers: [
        AuthService,
        AuthGuard
    ]
})
export class AuthModule { }
