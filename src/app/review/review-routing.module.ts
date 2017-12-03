import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataContainerComponent } from './../shared/components/data-container/data-container.component';
import { ErrorComponent } from './../shared/components/errors/error.component';
import { AuthGuard } from './../core/auth/auth-guard.service';



const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        children: [
            {
                path: '',                                                   component: DataContainerComponent,
                canActivateChild: [AuthGuard],
                children: [
                    

                    // Wildcard route
                    { path: '**',                                           component: ErrorComponent,                              data: { error: '404' }}
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ReviewRoutingModule {}
