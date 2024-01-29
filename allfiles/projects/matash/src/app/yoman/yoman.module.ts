import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule  } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//pipes
import { CommonModule, DatePipe } from '@angular/common';
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
import { PkudaComponent } from './pkuda/pkuda.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },{
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: DashboardComponent,
        title: 'לוח הבקרה'
    },{
        path: 'pkuda/:year/:id', 
        pathMatch: 'full',
        component: PkudaComponent,
        title: 'ניהול פקודת יומן'
    }
];

@NgModule({
    declarations: [
        DashboardComponent,
        PkudaComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        CoreModule,
        SharedModule,
        //primeng
        DynamicDialogModule,
    ]
})
export class YomanModule { }
