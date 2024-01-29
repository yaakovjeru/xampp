import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'speed-dial',
    templateUrl: './speed-dial.component.html',
    styleUrls: ['./speed-dial.component.scss'],
})
export class SpeedDialComponent {

    displayItems: boolean = false;
    @Input() items!: any[];
    @Output() speedDialItemWasClicked: EventEmitter<any> = new EventEmitter();

    toggleList() {
        this.displayItems =! this.displayItems;
    }

    onItemClick(item: any) {
        this.speedDialItemWasClicked.emit(item);
    }
}