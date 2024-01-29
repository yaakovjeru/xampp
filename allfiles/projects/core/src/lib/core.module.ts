import { Injectable, NgModule } from '@angular/core';
import { CoreComponent } from './core.component';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
//prime modules
import {ButtonModule} from 'primeng/button';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {DialogModule} from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ListboxModule } from 'primeng/listbox';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PanelModule } from 'primeng/panel';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TooltipModule } from 'primeng/tooltip';
//pipes
import { dateNumbersPipe } from './pipes/dateNumbers.pipe';
import { SafePipe } from './pipes/safe.pipe';
//components
import { NavbarComponent } from './components/navbar/navbar.component';
import { Router, RouterModule } from '@angular/router';
import { LibSvgComponent } from './lib-svg/lib-svg.component';
import { LibSvgDirective } from './lib-svg/lib-svg.directive';
import { InputComponent } from './components/input/input.component';
import { TableComponent } from './components/table/table.component';
import { ButtonComponent } from './components/button/button.component';
import { AriachComponent } from './components/ariach/ariach.component';
import { CellComponent } from './components/table/cell/cell.component';
import { NotesComponent } from './components/notes/notes.component';
import { SearchComponent } from './components/search/search.component';
import { SignaturesComponent } from './components/signatures/signatures.component';

@NgModule({
  declarations: [
    CoreComponent,
    NavbarComponent,
    LibSvgComponent,
    LibSvgDirective,
    InputComponent,
    TableComponent,
    ButtonComponent,
    dateNumbersPipe,
    SafePipe,
    AriachComponent,
    CellComponent,
    NotesComponent,
    SearchComponent,
    SignaturesComponent,
  ],
  imports: [
    CommonModule,
    // RouterModule,
    InlineSVGModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    //primeng
    // DynamicDialogModule,
    // AccordionModule,
    // AutoCompleteModule,
    ButtonModule,
    // CalendarModule,
    ConfirmPopupModule,
    CheckboxModule,
    // ChipsModule,
    ConfirmDialogModule,
    // ContextMenuModule,
    DialogModule,
    DropdownModule,
    // FieldsetModule,
    // FileUploadModule,
    InputNumberModule,
    // InputSwitchModule,
    InputTextModule,
    // InputTextareaModule,
    // ListboxModule,
    MenuModule,
    // MenubarModule,
    // MessageModule,
    // MessagesModule,
    MultiSelectModule,
    OverlayPanelModule,
    // PanelModule,
    // ProgressBarModule,
    RadioButtonModule,
    // RatingModule,
    RippleModule,
    SelectButtonModule,
    // SliderModule,
    // SplitButtonModule,
    TableModule,
    // TabViewModule,
    // TieredMenuModule,
    // TimelineModule,
    ToastModule,
    // ToggleButtonModule,
    TooltipModule, 
  ],
  exports: [
    CoreComponent,
    NavbarComponent,
    LibSvgComponent,
    LibSvgDirective,
    InputComponent,
    TableComponent,
    ButtonComponent,
    dateNumbersPipe,
    SafePipe,
    AriachComponent,
    CellComponent,
    NotesComponent,
    SearchComponent,
    SignaturesComponent,
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: function(router: Router) {
        return new AuthInterceptor(router);
      },
      multi: true,
      deps: [Router]
    }
  ]
})
export class CoreModule { }


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private router: Router
    ) {}

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        //handle your auth error or rethrow
        // console.log('my error http: '+err.status);
        if (err.status === 401) {
            console.log('אין לך אישור לגשת למשאב זה');
            document.location.href = 'http://jer400:10100/yam/';
            //navigate /delete cookies or whatever
            //this.router.navigateByUrl(`/login`);
            // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
            //return of(err.message); // or EMPTY may be appropriate here
        }else if (err.status === 403) {
            console.log('התנתקת מהמערכת, אנא התחברו שוב');
            document.location.href = 'http://jer400:10100/yam/';
        }
        return throwError(err);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Clone the request to add the new header.
        const authReq = req.clone();
        return next.handle(authReq).pipe(catchError(x=> this.handleAuthError(x))); //here use an arrow function, otherwise you may get "Cannot read property 'navigate' of undefined" on angular 4.4.2/net core 2/webpack 2.70
    }
}