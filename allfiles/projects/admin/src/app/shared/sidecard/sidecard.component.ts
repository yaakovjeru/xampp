import { PrimeNGConfig } from 'primeng/api';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ZIndexUtils } from 'primeng/utils';

@Component({
  selector: 'app-sidecard',
  templateUrl: './sidecard.component.html',
  styleUrls: ['./sidecard.component.scss']
})
export class SidecardComponent implements OnInit {

    @Input() title?: string;
    @Input() tabText!: string;
    @Input() iconClass!: string;
    @Input() tabStyle: any;
    @Input() set closeSideCard(close: boolean) {
        if (close) {
            this.opened = false;
        }
    }
    @Output() openWindow: EventEmitter<any> = new EventEmitter<any>();
    @Output() closeWindow: EventEmitter<any> = new EventEmitter<any>();

    opened = false;
    zIndex: number = 1000;

    constructor(private primengConfig: PrimeNGConfig) {
        this.zIndex = this.primengConfig.zIndex.overlay;
    }

    ngOnInit(): void {
    }

    getTitle() {
        return this.title == '' || !this.title ? this.tabText : this.title;
    }

    open() {
        this.opened = !this.opened;
        if (this.opened == true)
            this.openWindow.emit();
    }

    close() {
        this.opened = false;
    }

    getZIndex() {
        return this.zIndex;
    }
}