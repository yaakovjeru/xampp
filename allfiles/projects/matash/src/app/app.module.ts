import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule  } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//pipes
import { DatePipe } from '@angular/common';
//module
import { CoreModule } from 'core';
import { SharedModule } from './shared/shared.module';
//prime modules
import { DynamicDialogModule } from 'primeng/dynamicdialog';
//services
import { DialogService } from 'primeng/dynamicdialog';
import { AuthGuardService as AuthGuard } from 'core';
//components
import { AppComponent } from './app.component';
import { ItrSifComponent } from './t_ragil_inq/itr-sif/itr-sif.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'yoman',
        pathMatch: 'full',
    },{
        path: 'yoman',
        canActivate: [AuthGuard],
        loadChildren: () => import('./yoman/yoman.module').then(m => m.YomanModule),
        title: 'פקודות יומן'
    },{
        path: 't_ragil',
        canActivate: [AuthGuard],
        loadChildren: () => import('./t_ragil/t_ragil.module').then(m => m.TragilModule),
        title: 'פקודות יומן'
    }
   
];

@NgModule({
    declarations: [
        AppComponent,
        ItrSifComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot(routes, { useHash: true }),
        CoreModule,
        // SandboxModule,
        SharedModule,
        //primeng
        DynamicDialogModule,
    ],
    providers: [
        DialogService,
        DatePipe
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
