import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
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
import { LibSharedModule } from '../lib-shared/lib-shared.module';
import { ProjectsRelatedModule } from '../projects-related/projects-related.module';
import { LibDemoNotFoundComponent } from './demo/not-found.component';
import { SandboxTableComponent } from './sandbox-table/sandbox-table.component';
import { LibSandboxPrimeDesignerComponent } from './prime-designer/prime-designer.component';
import { SandboxRoutingModule } from './sandbox-routing.module';
import { LibSandboxComponent } from './sandbox.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,

        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
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

        SandboxRoutingModule,
        LibSharedModule,
        ProjectsRelatedModule,
    ],
    declarations: [
        LibSandboxComponent,
        LibSandboxPrimeDesignerComponent,
        LibDemoNotFoundComponent,
        SandboxTableComponent
    ],
    exports: [
        LibSandboxComponent,
        LibSandboxPrimeDesignerComponent,
        LibDemoNotFoundComponent,
        SandboxTableComponent
    ],
    providers: [
        MessageService, ConfirmationService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

})
export class SandboxModule { }
