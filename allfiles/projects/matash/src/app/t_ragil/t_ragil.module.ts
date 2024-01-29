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
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { StepsModule } from 'primeng/steps';
import { TimelineModule } from 'primeng/timeline';
//services
import { DialogService } from 'primeng/dynamicdialog';
import { AuthGuardService as AuthGuard } from 'core';
//components
import { DashboardComponent } from './dashboard/dashboard.component';
import { TatimComponent } from './tatim/tatim.component';
import { StepsMenuComponent } from './steps-menu/steps-menu.component';

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
        path: 'tatim/:TKSAIF/:TKYEAR/:TKSCUM/:TKTEUR', 
        canActivate: [AuthGuard],
        component: TatimComponent,
        title: 'תתי סעיף'
    },
];

@NgModule({
    declarations: [
        DashboardComponent,
        TatimComponent,
        StepsMenuComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        CoreModule,
        SharedModule,
        //primeng
        DynamicDialogModule,
        InputTextModule,
        InputNumberModule,
        TableModule,
        ToastModule,
        CardModule,
        StepsModule,
        TimelineModule,
    ]
})
export class TragilModule { }
