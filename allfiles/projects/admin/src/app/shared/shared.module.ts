import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule  } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//module
import { CoreModule } from 'core';
//components
import { AriachComponent } from './components/ariach/ariach.component';
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


import { PkudaUploadComponent } from './dialogs/pkuda-upload/pkuda-upload.component';
import { TnuaDialogComponent } from './dialogs/tnua/tnua.component';
import { PkudaDupComponent } from './dialogs/pkuda-dup/pkuda-dup.component';
import { FavoritePagesComponent } from './favorite-pages/favorite-pages.component';

import { SidecardComponent } from './sidecard/sidecard.component';
import { LastActionComponent } from './last-action/last-action.component';
import { ActionsComponent } from './actions/actions.component';


@NgModule({
    declarations: [
        AriachComponent,
        PkudaUploadComponent,
        TnuaDialogComponent,
        PkudaDupComponent,
        FavoritePagesComponent,
        SidecardComponent,
        LastActionComponent,
        ActionsComponent,

    ],
    imports: [
        // BrowserModule,
        CommonModule,
        HttpClientModule,
        // BrowserAnimationsModule,
        FormsModule,
        // RouterModule.forRoot(routes, { useHash: true }),
        CoreModule,
        //primeng
        DynamicDialogModule,
        AccordionModule,
        AutoCompleteModule,
        ButtonModule,
        CalendarModule,
        ConfirmPopupModule,
        CheckboxModule,
        ChipsModule,
        ConfirmDialogModule,
        ContextMenuModule,
        DialogModule,
        DropdownModule,
        FieldsetModule,
        FileUploadModule,
        InputNumberModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        ListboxModule,
        MenuModule,
        MenubarModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        OverlayPanelModule,
        PanelModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        RippleModule,
        SelectButtonModule,
        SliderModule,
        SplitButtonModule,
        TableModule,
        TabViewModule,
        TieredMenuModule,
        TimelineModule,
        ToastModule,
        ToggleButtonModule,
        TooltipModule,
    ],
    exports: [
        AriachComponent,
        PkudaUploadComponent,
        TnuaDialogComponent,
        PkudaDupComponent,
        SidecardComponent,
        FavoritePagesComponent,
        LastActionComponent,
        ActionsComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SharedModule { }