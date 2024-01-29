import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { apiRecheshService } from '../../../apiRechesh.service';

@Component({
  selector: 'app-d-pritim',
  templateUrl: './d-pritim.component.html',
  styleUrls: ['./d-pritim.component.scss']
})
export class DPritimComponent {

    initData:any = [];
    dataTable: any = [];
    dataTableComments: any = [];
    dataTableTakziv: any = [];
    // dataTableLastOrders: any = [];
    dataTableYitrot: any = [];
    sidebardisplay:boolean = false;
    sidebarTitle:string;

    constructor(
        // private router: Router,
        public ref: DynamicDialogRef, 
        public config: DynamicDialogConfig,
        public api: apiRecheshService,
    ) {
        this.initData = config.data;
    }

    ngOnInit() {
        this.setupTableData();
    }

    setupTableData() {
        let drisha_id = this.initData.DRDRNO.split('-');
        drisha_id = drisha_id[2];
        this.api.getDrisha(this.initData.DRDRNO).subscribe(data => {
            this.dataTable = data['drishot'];
            this.dataTableComments = data['comments'];
            this.dataTableTakziv = data['takziv'];
            // this.dataTableLastOrders = data['last_orders'];
        });
    }

    getYitrotMahsan(ktlg){
        this.api.getYitrotMahsan(ktlg).subscribe(data => {
            this.sidebardisplay = true;
            this.dataTableYitrot = data;
        });
    }

    getKtlgDrishot(ktlg){
        this.api.getKtlgDrishot(ktlg, this.initData.DRDRNO).subscribe(data => {
            this.sidebardisplay = true;
            this.dataTableYitrot = data;
        });
    }

    rowClick(event){
        //this.openPritim(event);
    }
    
    actionClick(event){
        if(event.button.event == 'yitrot'){
            this.getYitrotMahsan(event.item.DPKTLG[0].data);
            this.sidebarTitle = event.item.XTEUR+' - יתרות במחסנים';
        }else if(event.button.event == 'ktlgDrishot'){
            this.getKtlgDrishot(event.item.DPKTLG[0].data);
            this.sidebarTitle = event.item.XTEUR;
        }
    }
}
