import { Component, OnInit, Input } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { apiRecheshService } from '../../../apiRechesh.service';
import { formatDate, DatePipe  } from "@angular/common";
import { Router, ActivationEnd } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import {
    toJewishDate,
    formatJewishDate,
    toHebrewJewishDate,
    formatJewishDateInHebrew,
    toGregorianDate,
    JewishMonth,
  } from "jewish-date";
import { CoreService } from 'core';

@Component({
  selector: 'app-d-vada',
  templateUrl: './d-vada.component.html',
  styleUrls: ['./d-vada.component.scss']
})
export class DVadaComponent {
    vadaTypes:any = [];
    minimumDate:any;
    formVada: FormGroup;
    initData:any = [];
    usersList:any[] = [];
    selectedUser:any;
    vadaFormSend:any;
    datePipe = new DatePipe('en-US');

    constructor(
        private router: Router,
        public ref: DynamicDialogRef, 
        public config: DynamicDialogConfig,
        public api: apiRecheshService,
        public coreApi: CoreService,
        private fb: FormBuilder,
        private messageService: MessageService,
    ) {
        this.router.events.subscribe((event) => {
            if (event instanceof ActivationEnd) {          
                if(this.ref) this.ref.close();
            }          
        });
        this.initData = config.data;
    }

    ngOnInit() {
        this.getUsers();
        this.vadaTypes = [
            { name: 'ועדת קניות', code: 1 },
            // { name: 'ועדת בלאי', code: 2 },
        ]
        
        this.formVada = this.fb.group({
            VDSGVD: [1, Validators.required],
            VDSHAA: ['', Validators.required],
            VDDATE: ['', Validators.required],
            VDDATH: ['', Validators.required],
            VDDATW: ['', Validators.required],
            VDHGDT: ['', Validators.required],
            VDHGDH: ['', Validators.required],
            VDHGDW: ['', Validators.required],
            VDMKUM: ['', Validators.required],
            TSUSR1: [''],
            TSUSR2: [''],
            TSUSR3: [''],
            TSUSR4: [''],
            TSMANG: [''],
            TSUSRTK1: [''],
            TSUSRTK2: [''],
            TSUSRTK3: [''],
            TSUSRTK4: [''],
            TSKTSRY: [''],
            TSZOOM: [''],
            SENDMAIL: [''],
            OLD_DATE: [''],
        });
        //if edit vada
        if(this.initData.formData){
            let vd_date = this.initData.formData.VDDATE.trim() != '0' ? new Date(this.initData.formData.VDDATE.substring(0, 4)+'-'+this.initData.formData.VDDATE.substring(4, 6)+'-'+this.initData.formData.VDDATE.substring(6, 8)) : null;
            let vd_last_date = this.initData.formData.VDHGDT.trim() != '0' ? new Date(this.initData.formData.VDHGDT.substring(0, 4)+'-'+this.initData.formData.VDHGDT.substring(4, 6)+'-'+this.initData.formData.VDHGDT.substring(6, 8)) : null;
            
            let TSUSR1 = {
                MSUSER: this.initData.formData.TSUSR1,
                SHMUSR: this.initData.formData.TSUSRSM1,
                VTNAME: this.initData.formData.TSUSRTK1
            }
            let TSUSR2 = {
                MSUSER: this.initData.formData.TSUSR2,
                SHMUSR: this.initData.formData.TSUSRSM2,
                VTNAME: this.initData.formData.TSUSRTK2
            }
            let TSUSR3 = {
                MSUSER: this.initData.formData.TSUSR3,
                SHMUSR: this.initData.formData.TSUSRSM3,
                VTNAME: this.initData.formData.TSUSRTK3
            }
            let TSUSR4 = {
                MSUSER: this.initData.formData.TSUSR4,
                SHMUSR: this.initData.formData.TSUSRSM4,
                VTNAME: this.initData.formData.TSUSRTK4
            }

            this.formVada.patchValue({
                VDDATE: vd_date,
                VDDATH: vd_date ? this.convertDateJ(vd_date) : null,
                VDDATW: vd_date ? this.getDay(vd_date) : null,
                VDHGDT: vd_last_date,
                VDHGDH: vd_last_date ? this.convertDateJ(vd_last_date) : null,
                VDHGDW: vd_last_date ? this.getDay(vd_last_date) : null,
                VDSHAA: this.initData.formData.VDSHAA ? new Date(2023, 1, 1, this.initData.formData.VDSHAA.substring(0,2), this.initData.formData.VDSHAA.substring(2,4), 0) : new Date(2023, 1, 1, 12, 0, 0),
                VDMKUM: this.initData.formData.VDMKUM.trim(),
                TSZOOM: this.initData.formData.TSZOOM.trim(),
                TSKTSRY: this.initData.formData.TSKTSRY.trim(),
                TSUSRTK1: this.initData.formData.TSUSRTK1,
                TSUSRTK2: this.initData.formData.TSUSRTK2,
                TSUSRTK3: this.initData.formData.TSUSRTK3,
                TSUSRTK4: this.initData.formData.TSUSRTK4,
                TSUSR1: TSUSR1,
                TSUSR2: TSUSR2,
                TSUSR3: TSUSR3,
                TSUSR4: TSUSR4,
                OLD_DATE: this.initData.formData.VDDATE.trim(),
            });
        }else{
            //new vada
            
            let TSUSR1 = {
                MSUSER: this.initData.initData.TSUSR1,
                SHMUSR: this.initData.initData.TSUSRSM1,
                VTNAME: this.initData.initData.TSUSRTK1
            }
            let TSUSR2 = {
                MSUSER: this.initData.initData.TSUSR2,
                SHMUSR: this.initData.initData.TSUSRSM2,
                VTNAME: this.initData.initData.TSUSRTK2
            }
            let TSUSR3 = {
                MSUSER: this.initData.initData.TSUSR3,
                SHMUSR: this.initData.initData.TSUSRSM3,
                VTNAME: this.initData.initData.TSUSRTK3
            }
            let TSUSR4 = {
                MSUSER: this.initData.initData.TSUSR4,
                SHMUSR: this.initData.initData.TSUSRSM4,
                VTNAME: this.initData.initData.TSUSRTK4
            }

            this.formVada.patchValue({
                // VDDATE: new Date(Date.now() + ( 3600 * 1000 * 168)),
                // VDDATH: this.convertDateJ(new Date(Date.now() + ( 3600 * 1000 * 168))),
                // VDDATW: this.getDay(new Date(Date.now() + ( 3600 * 1000 * 168))),
                // VDHGDT: new Date(Date.now() + ( 3600 * 1000 * 144)),
                // VDHGDH: this.convertDateJ(new Date(Date.now() + ( 3600 * 1000 * 144))),
                // VDHGDW: this.getDay(new Date(Date.now() + ( 3600 * 1000 * 144))),
                VDSHAA: new Date(2023, 1, 1, 12, 0, 0),
                TSUSRTK1: this.initData.initData.TSUSRTK1,
                TSUSRTK2: this.initData.initData.TSUSRTK2,
                TSUSRTK3: this.initData.initData.TSUSRTK3,
                TSUSRTK4: this.initData.initData.TSUSRTK4,
                VDMKUM: this.initData.initData.VDMKUM,
                TSUSR1: TSUSR1,
                TSUSR2: TSUSR2,
                TSUSR3: TSUSR3,
                TSUSR4: TSUSR4,
                TSMANG: this.initData.initData.TSMANG,
            });
            this.minimumDate = new Date();
        }
        
    }

    convertDateJ(date:any){
        let hdate = formatJewishDateInHebrew(toJewishDate(date));
        hdate = hdate.replaceAll("׳", "'");
        hdate = hdate.replaceAll('״', '"');
        return hdate;
    }

    getDay(date:any){
        let daysArr = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
        let d = new Date(date);
        return daysArr[d.getDay()];
    }

    onChangeDate(type:any){
        if(type == 'VDDATE'){
            this.formVada.patchValue({
                VDDATH: this.convertDateJ(this.formVada.value.VDDATE),
                VDDATW: this.getDay(this.formVada.value.VDDATE)
            });
        }else if(type == 'VDHGDT'){
            this.formVada.patchValue({
                VDHGDH: this.convertDateJ(this.formVada.value.VDHGDT),
                VDHGDW: this.getDay(this.formVada.value.VDHGDT)
            });
        }
    }

    getUsers(filter = 'all'){
        this.coreApi.getUsers(filter).subscribe(data => {
            this.usersList = data.data;
            if(this.formVada.value.TSUSR1) this.usersList.push(this.formVada.value.TSUSR1);
            if(this.formVada.value.TSUSR2) this.usersList.push(this.formVada.value.TSUSR2);
            if(this.formVada.value.TSUSR3) this.usersList.push(this.formVada.value.TSUSR3);
            if(this.formVada.value.TSUSR4) this.usersList.push(this.formVada.value.TSUSR4);
            this.usersList = [...new Map(this.usersList.map((m) => [m.MSUSER, m])).values()];
        });
    }

    searchUsers(event){
        this.getUsers(event);
    }

    formatDate(event) {
        let d = new Date(Date.parse(event));
        return d.getFullYear() + ('0' + (d.getMonth()+1)).slice(-2) + d.getDate();
    }

    onSelectTime(event) {
        let d = new Date(Date.parse(event));
        return `${('0' + (d.getHours()+1)).slice(-2)}${('0' + (d.getMinutes()+1)).slice(-2)}`;
    }

    onSubmit(){
        if (this.formVada.valid) {
            this.vadaFormSend = Object.assign({}, this.formVada.value);
            this.vadaFormSend.VDDATE = this.datePipe.transform(this.vadaFormSend.VDDATE, 'yyyyMMdd');
            this.vadaFormSend.VDHGDT = this.datePipe.transform(this.vadaFormSend.VDHGDT, 'yyyyMMdd');
            this.vadaFormSend.VDSHAA = this.datePipe.transform(this.vadaFormSend.VDSHAA, 'Hmm');
            //this.formVada.reset();
            if(this.initData.formData){
                this.vadaFormSend.VDMSVD = this.initData.formData.VDMSVD;
                this.api.putVada(JSON.stringify(this.vadaFormSend)).subscribe(data => {
                    if(data.success){
                        this.toast('בוצע בהצלחה', 'הועדה נערכה בהצלחה');
                        this.ref.close('edit');
                        if(data.change_date) this.router.navigate(['/rechesh/dashboard']);
                    }else{
                        this.toast('שגיאה', data.message, 'error');
                    }
                });
            }else{
                this.api.postVada(JSON.stringify(this.vadaFormSend)).subscribe(data => {
                    if(data.success){
                        this.toast('בוצע בהצלחה', 'הועדה התווספה בהצלחה');
                        this.ref.close('insert_new');
                    }else{
                        this.toast('שגיאה', data.message, 'error');
                    }
                });
            }
        }else{
            //this.toast('שגיאה', 'אירעה שגיאה בפעולה', 'error');
        }
    }

    toast(title = 'הערת המערכת', msg = 'בוצע בהצלחה', status = 'success') {
        this.messageService.add({ severity: status, summary: title, detail: msg, life: 6000 });
    }
}
