import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit{
 

  @Input() flag: boolean = false;
  @Output() moduleChanged: EventEmitter<any> = new EventEmitter<any>();

  closeFlag: boolean = false;

  ngOnInit() {
    this.closeFlag = false
  }
  changeState() {
    this.closeFlag = false;
  }
}
