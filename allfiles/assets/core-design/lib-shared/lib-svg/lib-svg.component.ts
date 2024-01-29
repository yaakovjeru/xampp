import { Component, Input } from '@angular/core';

@Component({
    selector: 'lib-svg',
    template: `<span class="lib-svg-box" [inlineSVG]="getSvg()" [removeSVGAttributes]="['fill']" [injectComponent]="false"></span>`,
    // host: { class: 'ed-svg' }
})
export class LibSvgComponent {

    @Input() svg!: string;

    getSvg() {
        return `assets/svgs/${this.svg}.svg`
    }

}