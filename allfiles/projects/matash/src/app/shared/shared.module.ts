import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule  } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//module
import { CoreModule } from 'core';
//components
import { AriachComponent } from './components/ariach/ariach.component';
//prime modules
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {DialogModule} from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PkudaUploadComponent } from './dialogs/pkuda-upload/pkuda-upload.component';
import { TnuaDialogComponent } from './dialogs/tnua/tnua.component';
import { PkudaDupComponent } from './dialogs/pkuda-dup/pkuda-dup.component';
import { CommonModule } from '@angular/common';
import { AddTatSaifComponent } from './dialogs/add-tat-saif/add-tat-saif.component';

@NgModule({
    declarations: [
        AriachComponent,
        PkudaUploadComponent,
        TnuaDialogComponent,
        PkudaDupComponent,
        AddTatSaifComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        CoreModule,
        DynamicDialogModule,
        CalendarModule,
        CheckboxModule,
        DialogModule,
        DropdownModule,
        InputNumberModule,
        InputTextModule,
        InputTextareaModule,
    ],
    exports: [
        AriachComponent,
        PkudaUploadComponent,
        TnuaDialogComponent,
        PkudaDupComponent,
    ]
})
export class SharedModule { }