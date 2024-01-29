import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { yoman_apiService } from '../../../yoman/yoman_api.service';
import { lastValueFrom } from 'rxjs';
import { formatDate } from "@angular/common";

@Component({
    selector: 'app-dialog-tnua',
    templateUrl: './tnua.component.html',
    styleUrls: ['./tnua.component.scss']
})
export class TnuaDialogComponent {

    formData: any = [];
    tnua_type: string;     
   
    PZL_LIST: any[];
    HN_LIST: any[];  
    isHN_ZCT: Boolean  = false; isHN_HVA: Boolean  = false; isPZL_ZCT: Boolean  = false; isPZL_HVA: Boolean  = false;

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        public api: yoman_apiService,
    ) {
        this.formData = config.data;
        if (this.formData.HZ == '1') {
            this.tnua_type = 'זכות';
        } else if (this.formData.HZ == '2') {
            this.tnua_type = 'חובה';
        } else if (this.formData.HZ == '3') {
            this.tnua_type = 'זכות/חובה';
        }

        var y = this.formData.VALDAT.substring(0,4);
        var m = this.formData.VALDAT.substring(4,6);
        var d = this.formData.VALDAT.substring(6,8);
        this.formData.EDTDAT  = new Date(y, m-1, d);       
    }

    ngOnInit(){
        this.isHN_ZCT = false; this.isHN_HVA = false; this.isPZL_ZCT = false; this.isPZL_HVA = false;
    }

    saveTnua() {
        this.formData.MOD = "UPD";
        if (this.formData.HZ == '3') this.formData.SCMZCT = this.formData.SCMHVA;       
        
        this.formData.VALDAT = formatDate(this.formData.EDTDAT, 'yyyyMMdd', 'en-US');       
       
        this.api.crudROW(this.formData.Y4, this.formData.PKDA, this.formData).subscribe(data => {
            this.ref.close('save');
        });
    }

    deleteTnua() {
        if (confirm("מאשר מחיקה?")) {
            this.formData.MOD = "DEL";
            this.api.crudROW(this.formData.Y4, this.formData.PKDA, this.formData).subscribe(data => {
                this.ref.close('delete');
            });
        }
    }

    async getHN_LIST(type) { 
        let findHN = "";  let findTUR = "";    
        let by = "HN";   

        if (type == 'HN_HVA') {           
            this.isHN_HVA = true;
            findHN = this.formData.HNHVA;
            findTUR= this.formData.HNHVAT && this.formData.HNHVAT != '' ? this.formData.HNHVAT.trim() : this.formData.HNHVAT;
        } 
        else {
            this.isHN_ZCT = true; 
            findHN = this.formData.HNZCT;
            findTUR= this.formData.HNZCTT && this.formData.HNZCTT != '' ? this.formData.HNZCTT.trim() : this.formData.HNZCTT;
        } 
        
        this.HN_LIST = [];        
        if (findTUR.length>3) by = "TUR";
        this.HN_LIST = await lastValueFrom(this.api.getHN(this.formData.Y4, findHN, findTUR, by));       
    }

    async getPZL_LIST(type) {
        let hn = "0";
        if (type == 'PZL_Z') {
            this.isPZL_ZCT = true;
            hn = this.formData.HNZCT;
        }
        else {
            this.isPZL_HVA = true;
            hn = this.formData.HNHVA;
        }
        this.PZL_LIST = [];           
        this.PZL_LIST = await lastValueFrom(this.api.getPZL(this.formData.Y4, hn));
        this.PZL_LIST.unshift({ "KOD": "0", "TXT": "*** בחר פיצול ***" });       
        if (this.PZL_LIST.length == 1) {
            if (type == 'PZL_Z') {
                this.formData.PZLZCT = "0";
                this.formData.PZLZCTT = "";
            }
            else {
                this.formData.PZLHVA = "0";
                this.formData.PZLHVAT = "";
            }
        }
    }

    selPZL(event, type) {         
        if (type == 'PZL_Z') {
            this.isPZL_ZCT = true;
            this.formData.PZLZCT = event.value.KOD;
            this.formData.PZLZCTT = event.value.TXT;
        } else {
            this.isPZL_HVA = true; 
            this.formData.PZLHVA = event.value.KOD;
            this.formData.PZLHVAT = event.value.TXT;
        } 
    }

    selHN(event, type) {
        if (type == 'HN_HVA') {           
            this.isHN_HVA = false;
            this.formData.HNHVA = event.value.KOD;
            this.formData.HNHVAT = event.value.TXT;            
        }
         else {           
            this.isHN_ZCT = false;
            this.formData.HNZCT = event.value.KOD;
            this.formData.HNZCTT = event.value.TXT;           
        }          
    }    

}
