import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MainModule } from './main/main.module';
// import { RouteReuseStrategy } from '@angular/router';
// import { CustomReuseStrategy } from './shared/router/custom-reuse-srtrategy';
import { PulsarFormsModule } from './shared/components/forms/pulsar-forms.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './main/login/login.component';

// TODO, Ver como recolocar componentes o servicios compartidos entre módulos y que perteneces a una sección
import { PackageGraphQLService } from './modules/admin/package/package-graphql.service';
import { FieldGraphQLService } from './modules/admin/field/field-graphql.service';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        PulsarFormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        CoreModule,
        MainModule
    ],
    providers: [
        // { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
        PackageGraphQLService,
        FieldGraphQLService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }
