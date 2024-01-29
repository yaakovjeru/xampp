import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { LibSvgComponent } from './lib-svg/lib-svg.component';
import { LibSvgDirective } from './lib-svg/lib-svg.directive';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        InlineSVGModule.forRoot(),
    ],
    declarations: [
        LibSvgComponent,
        LibSvgDirective,
    ],
    exports: [
        LibSvgComponent,
        LibSvgDirective,
    ],
    providers: [
    ],
    schemas: [],

})
export class LibSharedModule { }
