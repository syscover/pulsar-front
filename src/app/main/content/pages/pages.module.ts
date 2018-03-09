import { NgModule } from '@angular/core';
import { Error404Module } from './errors/404/error-404.module';
import { Error500Module } from './errors/500/error-500.module';
import { MaintenanceModule } from './maintenance/maintenence.module';
 
@NgModule({
    imports: [
        // Errors
        Error404Module,
        Error500Module,

        // Maintenance
        MaintenanceModule,
    ]
})
export class FusePagesModule 
{
}
