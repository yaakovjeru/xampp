import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
    @Input() icon:string;
    @Input() label:string;
    @Input() size:string;
    @Input() bclass:string;
    @Input() disabled:string;
    @Input() onlyIcon:boolean = false;
    
    //readonly="readonly" disabled="disabled"
    constructor(){

    }

    ngOnInit(){
        
    }
}
