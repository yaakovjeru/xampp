import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ariach',
  templateUrl: './ariach.component.html',
  styleUrls: ['./ariach.component.scss']
})
export class AriachComponent {
    @Input() title:string;
    @Input() numbers:any;
    @Input() icon:string;

    ngOnInint(){
        // console.log(this.numbers);
    }
}
