import { Component } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CoreService } from '../../core.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'lib-signatures',
    templateUrl: './signatures.component.html',
    styleUrls: ['./signatures.component.css']
})
export class SignaturesComponent {
    initData:any;
    dataTable: any = [];
    form!: FormGroup;

    constructor(
        public config: DynamicDialogConfig,
        public api: CoreService,
        private messageService: MessageService
    ){
        this.initData = config.data;
    }

    ngOnInit() {
        this.setupTableData();
    }

    setupTableData() {
        if(this.initData.item.sug == 1){
            this.api.getDrsSignatures(this.initData.item.asmx, this.initData.item.sug).subscribe(data => {
                this.dataTable = data;
            });
        }else{
            this.api.getVadSignatures(this.initData.item.asmx, this.initData.item.sug).subscribe(data => {
                this.dataTable = data;
            });
        }
        
    }

    rowClick(event){
        // this.openPritim(event);
    }
    
    actionClick(event){
        if(event.button.event == 'email'){
            window.open('mailto:'+event.item.ELUSER.trim()+'@jerusalem.muni.il', '_blank');
        }
    }
}
