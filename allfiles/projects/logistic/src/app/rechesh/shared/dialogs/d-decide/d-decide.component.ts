import { Component, OnInit, Input } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { apiRecheshService } from '../../../apiRechesh.service';
import { formatDate, DatePipe  } from "@angular/common";
import { Router, ActivationEnd } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CoreService } from 'core';

@Component({
  selector: 'app-d-decide',
  templateUrl: './d-decide.component.html',
  styleUrls: ['./d-decide.component.scss']
})
export class DDecideComponent {
    decideTypes:any = [
        { name: 'אושר', code: 1 },
        { name: 'לא אושר', code: 2 },
        { name: 'מאושר מותנה', code: 3 },
    ]
    formVada: FormGroup;
    initData:any = [];
    vadaFormSend:any;
    sidebardisplay:boolean = false;
    dataTable: any = [];
    vada_status:number;

    constructor(
        private router: Router,
        public ref: DynamicDialogRef, 
        public config: DynamicDialogConfig,
        public api: apiRecheshService,
        public coreApi: CoreService,
        private fb: FormBuilder,
        private messageService: MessageService,
    ){
        this.router.events.subscribe((event) => {
            if (event instanceof ActivationEnd) {          
                if(this.ref) this.ref.close();
            }          
        });
        this.initData = config.data;
        this.vada_status = this.initData.vada.VDSTTS;
    }

    ngOnInit(){
        this.getDrishaStatus();
        this.formVada = this.fb.group({
            decide: [1, Validators.required],
            note1: [''],
            note2: [''],
            vada_status: [''],
        });
        //if edit vada
        this.formVada.patchValue({
            decide: {
                code: this.initData.item.DRSTTS == '3' && this.initData.item.DRISMT == '1' ? 3 : (this.initData.item.DRSTTS == '3' && this.initData.item.DRISMT == '0' ? 2 : 1)
            }
        });
        this.formVada.patchValue({
            vada_status: this.vada_status
        });
    }

    openNotes(type){
        this.sidebardisplay = true;
        this.api.getHearot().subscribe(data => {
            this.dataTable = data;
            this.dataTable.buttons = this.dataTable.buttons ? this.dataTable.buttons : [];
            this.dataTable.buttons.push(
                {
                    "type": "button",
                    "label": "בחירה",
                    "icon": "add",
                    "event": "addText"+type
                }
            )
        });
    }

    rowClick(event){
        // this.openPritim(event);
    }

    actionClick(event){
        if(event.button.event == 'addText1'){
            this.formVada.patchValue({
                note1: this.formVada.value.note1.trim() +' '+ event.item.RMRMNM.trim()
            })
        }
        if(event.button.event == 'addText2'){
            this.formVada.patchValue({
                note2: this.formVada.value.note2.trim() +' '+ event.item.RMRMNM.trim()
            })
        }
    }

    getDrishaStatus(){
        this.api.getDrishaStatus(this.initData.item.DRDRNO).subscribe(data => {
            this.dataTable = data;
            this.dataTable.buttons = this.dataTable.buttons ? this.dataTable.buttons : [];
            this.dataTable.menu = this.dataTable.menu ? this.dataTable.menu : [];
            this.formVada.patchValue({
                note1: this.dataTable.initdata.note1,
                note2: this.dataTable.initdata.note2,
            });
            if(this.dataTable.initdata.note1 == '' && this.dataTable.initdata.note1 == '' && this.initData.decide == 1 && this.initData.vada.VDSTTS == 2){
                this.formVada.patchValue({
                    note1: 'התקיים דיון בוועדה',
                    note2: 'דרישת הרכש מאושרת לביצוע',
                });
            }
        });
    }

    onSubmit(){
        if (this.formVada.valid) {
            this.vadaFormSend = Object.assign({}, this.formVada.value);
            this.vadaFormSend.drisha = this.initData.item;
            this.api.postDecide(JSON.stringify(this.vadaFormSend)).subscribe(data => {
                if(data.success){
                    this.toast('בוצע בהצלחה', 'הועדה התווספה בהצלחה');
                    this.ref.close('update_status');
                }else{
                    this.toast('שגיאה', data.message, 'error');
                }
            });
        }else{
            this.toast('שגיאה', 'אירעה שגיאה בפעולה', 'error');
        }
    }
    toast(title = 'הערת המערכת', msg = 'הערת מערכת', status = 'success') {
        this.messageService.add({ severity: status, summary: title, detail: msg, life: 6000 });
    }
}
