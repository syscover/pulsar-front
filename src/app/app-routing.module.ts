import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './main/login/login.component';

export const routes: Routes = [
    // bootstrap route
    { path: '', redirectTo: 'pulsar/login', pathMatch: 'full' },
    { path: 'pulsar', redirectTo: 'pulsar/login', pathMatch: 'full' },
    { path: 'pulsar/login', component: LoginComponent },
    { path: 'pulsar', component: MainComponent, loadChildren: 'app/main/main.module#MainModule' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
