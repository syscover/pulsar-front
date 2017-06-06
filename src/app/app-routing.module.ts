import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';

import * as config from './core/app-globals';

export const routes: Routes = [
    // bootstrap route
    { path: config.appRootPrefix, redirectTo: config.appRootPrefix + '/login', pathMatch: 'full' },
    { path: config.appRootPrefix + '/login', component: LoginComponent },
    { path: config.appRootPrefix, component: MainComponent, loadChildren: 'app/main/main.module#MainModule' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
