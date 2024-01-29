import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lib-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent {
    @Input() cellType:any;
    @Input() cellValue:any;
    @Input() cellClass:any;
    @Input() cellLink:any;
    @Output() callButton = new EventEmitter<any>();

    constructor(){}

    ngOnInit(){

    }

    openLink (link){
      if(link && link != ''){
        if(/(http(s?)):\/\//i.test(link)){
          window.open( link, '_blank');
          //window.location.href = link;
        }else{
          let button = {
            label: this.cellValue,
            event: link,
          };
          this.callButton.next(button);
        }
      }
    }

}
