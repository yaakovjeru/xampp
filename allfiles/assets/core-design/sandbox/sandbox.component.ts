import { Component } from '@angular/core';

@Component({
    selector: 'lib-sandbox',
    templateUrl: './sandbox.component.html',
    styleUrls: ['./sandbox.component.scss']
})

export class LibSandboxComponent {

    cardsToDisplay: string[] = ['form', 'svg', 'table', 'speedDial']; // form, svg, table, speedDial, prime
    speedDialMenu = [
        { label: 'שורת זכות' }, { label: 'שורת חובה' }, { label: 'שורה משולבת' },
    ]

    shouldDispalyCard(cardName: string) {
        return this.cardsToDisplay.includes(cardName);
    }
}