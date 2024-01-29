import { OnInit, ComponentFactoryResolver, Directive, ElementRef, HostBinding, Input, Renderer2, ViewContainerRef, ViewChild } from '@angular/core';
import { LibSvgComponent } from './lib-svg.component';

@Directive({
    selector: 'p-button[libSvg], [pButton][libSvg]',
})
export class LibSvgDirective implements OnInit {

    libSvgComponent: any;
    @Input() libSvg!: string;

    // @HostBinding('class.p-button-icon-only') get buttonOnlyClass() {
    //     return this.OnlyHasIcon();
    // }
    // @HostBinding('class.ed-svg-holder') get holderClass() {
    //     return !this.isButton()
    // }

    constructor(
        private el: ElementRef,
        private viewContainerRef: ViewContainerRef,
        private renderer: Renderer2,
        private resolver: ComponentFactoryResolver
    ) { }

    ngOnInit(): void {
        this.createSvgComponent();
    }

    ngAfterViewInit(): void {
        this.insertSvgComponent();
    }

    createSvgComponent() {
        const factory = this.resolver.resolveComponentFactory(LibSvgComponent);
        this.libSvgComponent = this.viewContainerRef.createComponent(factory, 0);
        // pass inputs to component
        this.libSvgComponent.instance.svg = this.libSvg;

        // const buttonElement = this.getButonElement()

        // if (this.OnlyHasIcon()) {
        //     buttonElement.classList.add('p-button-icon-only')
        // }

        // this.renderer.insertBefore(buttonElement, this.libSvgComponent.location.nativeElement, buttonElement.children.item(0))
    }

    insertSvgComponent() {
        const buttonElement = this.getButonElement()
        
        if (this.OnlyHasIcon()) {
            buttonElement.classList.add('p-button-icon-only')
        }
        
        this.renderer.insertBefore(buttonElement, this.libSvgComponent.location.nativeElement, buttonElement.children.item(0))
    }

    getSvg() {
        return `assets/svgs/${this.libSvg}.svg`
    }

    getButonElement() {
        return this.el.nativeElement.tagName === 'P-BUTTON'
            ? this.el.nativeElement.children.item(0)
            : this.el.nativeElement;
    }

    OnlyHasIcon() {
        return !this.el.nativeElement.getAttribute('label');
        // const labelValue = this.getButonElement().getAttribute('label');
        // return labelValue === null || labelValue === '' || labelValue === undefined;
    }

}