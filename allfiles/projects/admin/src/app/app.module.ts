import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/tubin'
    }, {
        path: 'tubin',
        loadChildren: () => import('./tubin/tubin.module').then(m => m.TubinModule),
        title: 'לוח הבקרה'
    }
];

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot(routes, { useHash: true }),
        CoreModule,
        SharedModule,
        //primeng
        DynamicDialogModule,
    ],
    providers: [
        DialogService,
        DatePipe
    ],
    exports: [
        SharedModule
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
