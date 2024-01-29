import { Component, OnInit, Inject, Input } from '@angular/core';

@Component({
  selector: 'lib-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

    @Input() type:any = 'text';
    @Input() label:any=false;
    @Input() placeholder:any=false;
    @Input() required:any=false;
    @Input() hint:any=false;
    
    constructor(){}
    
    ngOnInit() {}
}
