import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-steps-menu',
  templateUrl: './steps-menu.component.html',
  styleUrls: ['./steps-menu.component.scss']
})
export class StepsMenuComponent  implements OnInit {
  events: any[];

  constructor() {
      this.events = [
          { status: 'true', state: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
          { status: 'true', state: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
          { status: 'true', state: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
          { status: 'false', state: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
      ];
  }
    ngOnInit() {
    
    }
}
