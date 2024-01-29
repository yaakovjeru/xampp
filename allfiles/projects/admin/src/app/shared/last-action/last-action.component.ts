import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-last-action',
  templateUrl: './last-action.component.html',
  styleUrls: ['./last-action.component.scss']
})
export class LastActionComponent implements OnInit{
 

  @Input() flag: boolean = false;
  @Output() moduleChanged: EventEmitter<any> = new EventEmitter<any>();

  closeFlag: boolean = false;
  exemple: any[];

  ngOnInit() {
    this.closeFlag = false;
    this.exemple = [
      {
        action_name: "דשבורד",
        create_date: "12/07/2023",
      },
      {
        action_name: "דשבורד",
        create_date: "12/07/2023",
      },
      {
        action_name: "דשבורד",
        create_date: "12/07/2023",
      },
      {
        action_name: "דשבורד",
        create_date: "12/07/2023",
      },
      {
        action_name: "דשבורד",
        create_date: "12/07/2023",
      },
      {
        action_name: "דשבורד",
        create_date: "12/07/2023",
      },
      {
        action_name: "דשבורד",
        create_date: "12/07/2023",
      },
      ]
  }
  changeState() {
    this.closeFlag = false;
  }
}
