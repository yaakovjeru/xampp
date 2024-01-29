import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
//module
import { CoreModule } from 'core';
//prime modules
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TabViewModule } from 'primeng/tabview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { SidebarModule } from 'primeng/sidebar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
// import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
//services
import { AuthGuardService as AuthGuard } from 'core';
//components
import { DashboardComponent } from './dashboard/dashboard.component';
import { VadaComponent } from './vada/vada.component';
import { DVadaComponent } from './shared/dialogs/d-vada/d-vada.component';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DPritimComponent } from './shared/dialogs/d-pritim/d-pritim.component';
import { DDecideComponent } from './shared/dialogs/d-decide/d-decide.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },{
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: DashboardComponent,
        title: 'מערכת כספית - לוח הבקרה'
    },{
        path: 'vada/:id',
        canActivate: [AuthGuard],
        component: VadaComponent,
        title: 'מערכת כספית - ועדת קניות'
    }
];

@NgModule({
    declarations: [
        DashboardComponent,
        VadaComponent,
        DVadaComponent,
        DPritimComponent,
        DDecideComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forChild(routes),
        CoreModule,
        //primeng
        DynamicDialogModule,
        ConfirmDialogModule,
        InputTextModule,
        CalendarModule,
        DropdownModule,
        TabViewModule,
        DialogModule,
        FieldsetModule,
        SidebarModule,
        OverlayPanelModule,
        // MessagesModule,
        ToastModule,
        CheckboxModule,
    ],
    exports: [
      DPritimComponent,
      DDecideComponent,
    ]
})
export class RecheshModule { }
