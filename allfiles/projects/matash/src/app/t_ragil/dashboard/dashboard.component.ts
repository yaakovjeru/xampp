import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ragil_apiService } from '../t_ragil_api.service';
import { PkudaUploadComponent } from '../../shared/dialogs/pkuda-upload/pkuda-upload.component';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import * as ExcelJS from 'exceljs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    showFilters: boolean = false;
    fndHN: any = "0"; fndTUR: any = ""; fndY4: any = "";
    dtSEIFIM: any = [];
    dtTATIM: any = [];

    ref: DynamicDialogRef;
    sum3 = [{ title: 'שבועי', sum: '0' }, { title: 'חודשי', sum: '0' }, { title: 'שנתי', sum: '0' }];

    constructor(
        private router: Router,
        public dialogService: DialogService,
        public api: ragil_apiService,
        private route: ActivatedRoute
    ) {
        this.router.events.subscribe((event) => {
            if (event instanceof ActivationEnd) {
                if (this.ref) this.ref.close();
            }
        });
    }

    ngOnInit() {
        this.fndY4 = new Date().getFullYear();
        // this.findSEIF();
    }

    rowClick(event) {
        console.log(event)
    }

    actionClick(event) {
      
        this.router.navigate(['../tatim/' + event.item.TKSAIF + '/' + this.fndY4+ '/' + event.item.TKSCUM+ '/' + event.item.TKTEUR], { relativeTo: this.route});
        // this.fndHN = event.item.TKSAIF;
        // this.getTATEY_SEIFIM();
        // this.dtSEIFIM = [];
    }

    async findSEIF() {
        this.dtSEIFIM = await lastValueFrom(this.api.findSEIF(this.fndY4, this.fndHN, this.fndTUR));
        if (this.dtSEIFIM.totalrows == 1) {
            this.fndHN = this.dtSEIFIM.data[0].TKSAIF;
            this.getTATEY_SEIFIM();
            this.dtSEIFIM = [];
        }
    }

    async getTATEY_SEIFIM() {
        this.dtTATIM = await lastValueFrom(this.api.getSEIF_TATIM(this.fndY4, this.fndHN));
        this.dtTATIM.buttons.push({
            "type": "button",
            "label": "מחיקה",
            "icon": "delete",
            "class": "surface-800",
        });
    }

    toggleFilters() {
        this.showFilters = !this.showFilters;
    }

    getFREE_PZL() {
        //"SELECT pzseq from seqpzl where pzseq > 5000 AND PZSEQ not in (select codpzl from v_pzl_all where hayear=23 and codpzl>5000)FETCH FIRST 1  ROWS ONLY"
    }




}
