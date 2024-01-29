import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; 
import { HTTP_INTERCEPTORS, HttpClientModule, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//pipes
import { DatePipe } from '@angular/common';
//prime modules
import { DynamicDialogModule } from 'primeng/dynamicdialog';
//services
import { DialogService } from 'primeng/dynamicdialog';
import { CoreModule, AuthGuardService as AuthGuard } from 'core';
//components
import { AppComponent } from './app.component';
import { Observable, finalize, map } from 'rxjs';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/rechesh/dashboard'
    },{
        path: 'rechesh',
        loadChildren: () => import('./rechesh/rechesh.module').then(m => m.RecheshModule),
        title: 'לוח הבקרה'
    }
];

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
    private totalRequests = 0;
    constructor(private authGuard: AuthGuard) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.method == 'GET'){
            return next.handle(req).pipe(
               
            );
        }else{
            this.totalRequests++;
            this.authGuard.show_loader();
            return next.handle(req).pipe(
                finalize(() => {
                  this.totalRequests--;
                  if (this.totalRequests === 0) {
                    this.authGuard.hide_loader();
                  }
                })
            );
        }
        
    }
}

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
        //primeng
        DynamicDialogModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
        DialogService,
        DatePipe,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }

