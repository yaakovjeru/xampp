import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { LibSharedModule } from '../lib-shared/lib-shared.module';
import { SpeedDialComponent } from './speed-dial/speed-dial.component';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        LibSharedModule,
    ],
    declarations: [
        SpeedDialComponent,
    ],
    exports: [
        SpeedDialComponent,
    ],
    providers: [
    ],
    schemas: [],

})
export class ProjectsRelatedModule { }
