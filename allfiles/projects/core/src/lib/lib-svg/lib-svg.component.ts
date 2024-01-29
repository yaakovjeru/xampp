import { Component, Input } from '@angular/core';
import { base_url } from '../core.service';

@Component({
    selector: 'lib-svg',
    template: `<span class="lib-svg-box" [inlineSVG]="getSvg()" [removeSVGAttributes]="['fill']" [injectComponent]="false"></span>`,
    // host: { class: 'ed-svg' }
})
export class LibSvgComponent {
    base_url:string = base_url;
    @Input() svg!: string;

    getSvg() {
        return base_url+`/core/assets/svgs/${this.svg}.svg` 
    }

}