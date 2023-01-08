import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EventsComponent } from './events/events.component';
import { EventsEditDialog } from './events/events.component';
import { EventComponent } from './event/event.component';
import { EventUsersDialog } from './event/event.component';
import { ComponentsModule } from '../components/components.module';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'events',
    pathMatch: 'full',
  }, {
    path: 'events',
    component: EventsComponent,
    title: 'ניהול אירועי חתימות'
  }, {
    path: 'event/:id',
    component: EventComponent,
    // title: 'ניהול אירוע:'
  }, {
    path: 'event/:id/:gorem',
    component: EventComponent,
    // title: 'ניהול אירוע:'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  declarations: [
    EventsComponent,
    EventComponent,
    EventsEditDialog,
    EventUsersDialog,
  ]
})
export class SignaturesModule { }
