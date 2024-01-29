import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
//pipes
import { DatePipe } from '@angular/common';
//module
import { CoreModule } from 'core';
import { SharedModule } from '../shared/shared.module';
//prime modules
import { DynamicDialogModule } from 'primeng/dynamicdialog';
//services
import { DialogService } from 'primeng/dynamicdialog';
import { AuthGuardService as AuthGuard } from 'core';
//components
import { DashboardComponent } from './dashboard/dashboard.component';
import { DrishaComponent } from './drisha/drisha.component';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },{
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: DashboardComponent,
        title: 'לוח הבקרה'
    },{
        path: 'drisha/:id',
        canActivate: [AuthGuard],
        component: DrishaComponent,
        title: 'דרישת טוביןד'
    }
];

@NgModule({
    declarations: [
        DashboardComponent,
        DrishaComponent,
    ],
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild(routes),
        CoreModule,
        SharedModule,
        //primeng
        DynamicDialogModule,
    ]
})
export class TubinModule { }
