import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { apiRecheshService } from '../apiRechesh.service';
import { Router, ActivationEnd, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DPritimComponent } from '../shared/dialogs/d-pritim/d-pritim.component';
import { DVadaComponent } from '../shared/dialogs/d-vada/d-vada.component';
import { DDecideComponent } from '../shared/dialogs/d-decide/d-decide.component';
import { CoreService, NotesComponent, SearchComponent, SignaturesComponent, dateNumbersPipe } from 'core';
import {ConfirmationService} from 'primeng/api';
import { MessageService } from 'primeng/api';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
    selector: 'app-vada',
    templateUrl: './vada.component.html',
    styleUrls: ['./vada.component.scss'],
    providers: [ConfirmationService]
})
export class VadaComponent {
    dataTable: any = [];
    ref: DynamicDialogRef;
    id:number;
    manageVada:boolean = false;
    viewSeder:boolean = false;
    query_params:any;
    myObserver:any = null;
    insearch:boolean = false;
    sumStatus:any = {};
    vada_status = '';
    pdfUrlIfram:any;
    pdfView:any;
    pdfViewBlob:any;
    //1=open -- 2=open with drishot -- 3=seder open -- 4= seder sign -- 5= seder finish sign not allowd -- 6= seder finish sign  -- 
    //7=seder yom finish decide -- 8=open protcol -- 9= protocl in sign -- 10= protocol not allowd -- 11= protocl finish  
    vadaStatus:any = 1;
    readyToManageVada:boolean = false;
    vadaClosed:boolean = false;
    vadaDialogSingleDrisha:boolean = false;
    vadaDialogSingleDrishaApprove:boolean = false;
    vadaDialogCancelSeder:boolean = false;
    vadaDialogEditVada:boolean = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public dialogService: DialogService,
        public api: apiRecheshService,
        private _location: Location,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private _sanitizer: DomSanitizer
    ){
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        this.myObserver = this.router.events.subscribe((event) => {
            if (event instanceof ActivationEnd){
                this.query_params = event.snapshot.queryParams;
                if(this.ref) this.ref.close();
            }
            if(event instanceof NavigationEnd){
                this.setupTableData(this.query_params);
                if((this.query_params.filter_fr_drisha && this.query_params.filter_fr_drisha != '') || this.query_params.status && this.query_params.status != ''){
                    this.insearch = true;
                }else{
                    this.insearch = false;
                }
            }
        });
    }
    
    ngOnInit(){}

    ngOnDestroy() {
        this.myObserver.unsubscribe();
    }
    
    rowClick(event){
        this.openPritim(event);
    }

    search(){
        this.ref = this.dialogService.open(SearchComponent, {
            header: 'חיפוש מתקדם',
            width: '800px',
            styleClass: 'dialogNoPadding'
        });
    }

    searchStatus(status){
        this.router.navigate([], {queryParams: {'status': status}});
    }

    clearSearch(){
        this.router.navigate([], {});
    }
    
    actionClick(event){ 
        if(event.button.event == 'display'){
            this.openPritim(event.item);
        }else if(event.button.event == "archive"){
            window.open("http://jerarchiveviewer/ArchiveInputDocs.html?SystemId=99&archiveid=28&outside=true&tiknum="+event.item.DRDRNO+"&description="+event.item.DRTEUR, '_blank');
        }else if(event.button.event == 'messages'){
            this.openNotes(event.item);
        }else if(event.button.event == 'signatures'){
            this.openSignatures(event.item);
        }else if(event.button.event == 'drisha_out'){
            if(event.item.DRSTTS > 2){
                this.toast('שגיאה', 'אין אפשרות להוציא דרישה מועדה עם סטטוס מלא', 'error');
                return;
            }
            this.vadaAction('drisha_out', 'הוצאת הדרישה מועדה', 'האם להוציא את הדרישה מהועדה?', event.item);
        }else if(event.button.event == 'decide'){
            this.drishaDecide(1, event.item);
        }
    }

    getCurrentPdf(){
        this.pdfUrlIfram = '';
        this.viewSeder = true;
        this.api.postPdfSaver(Object.assign(this.dataTable)).subscribe(data => {
            this.pdfViewBlob = new Blob([data], { type: 'application/pdf' })
            let fileURL = URL.createObjectURL(this.pdfViewBlob);
            this.pdfView = this._sanitizer.bypassSecurityTrustResourceUrl(fileURL);
        });
        
    }

    async vadaAction(type, title, content, extradata:any = null){
        if(type == 'pdfSing' || type == 'pdfSingSeder'){
            let formdata = this.dataTable.initData;
            formdata['TYPE'] = type;
            this.postVadaAction(formdata, type);
            return;
        }

        if(type == 'sign10' || type == 'sign11'){             
            this.getCurrentPdf();
        }

        this.confirmationService.confirm({
            message: content,
            header: title,
            accept: () => {
                let formdata = this.dataTable.initData;
                formdata['TYPE'] = type;
                if(type == 'sign10' || type == 'sign11'){
                    const formData = new FormData();
                    formData.append('myFile', this.pdfViewBlob);
                    for (const key of Object.keys(formdata)) {
                        formData.append(key, (formdata as {[key: string]: string})[key]);
                    }
                    this.api.postPdfServer(formData).subscribe(data => {
                        if(data.success){
                            this.setupTableData();
                            this.toast();
                        }
                    });
                }else{
                    if(type == 'drisha_out'){
                        formdata =  {...formdata, ...extradata};
                    }
                    this.postVadaAction(formdata, type);
                    this.setupTableData();
                }
                
            },
            reject: () => {
                //this.toast('שגיאה', 'אירעה שגיאה בפעולה', 'error');
            }
        });
    }

    postSingleDrisha(drisha:any){
        if(drisha.length > 12 || drisha.length < 12){
            this.toast('שגיאה', 'מספר הדרישה אינו תקין', 'error');
        }else{
            let formdata = this.dataTable.initData;
            formdata['TYPE'] = 'insert_drishot';
            formdata['SINGLE_DRISHA'] = drisha;
            this.postVadaAction(formdata, 'insert_drishot');
            return;
        }
    }

    postSingleDrishaApprove(drisha:any){
        if(drisha.length > 12 || drisha.length < 12){
            this.toast('שגיאה', 'מספר הדרישה אינו תקין', 'error');
        }else{
            let formdata = this.dataTable.initData;
            formdata['TYPE'] = 'drisha_approve';
            formdata['SINGLE_DRISHA_APPROVE'] = drisha;
            this.postVadaAction(formdata, 'drisha_approve');
            return;
        }
    }

    postVadaCancelSeder(message:any){
        if(message.length < 12){
            this.toast('שגיאה', 'ההודעה ריקה', 'error');
        }else{
            let formdata = this.dataTable.initData;
            formdata['TYPE'] = 'cancel_seder';
            formdata['VADA_CANCEL_SEDER_MESSAGE'] = message;
            this.postVadaAction(formdata, 'cancel_seder');
            return;
        }
    }

    postVadaEdit(protocol:any, sederyom:any, zoom:any){
        if(protocol.length < 5){
            this.toast('שגיאה', 'תיאור הפרוטוקול ריק', 'error');
        }else{
            let formdata = this.dataTable.initData;
            formdata['TYPE'] = 'edit_vada_details';
            formdata['VADA_EDIT_DETAILS_PROTOCOL'] = protocol;
            formdata['VADA_EDIT_DETAILS_SEDERYOM'] = sederyom;
            formdata['VADA_EDIT_DETAILS_ZOOM'] = zoom;
            this.postVadaAction(formdata, 'edit_vada_details');
            return;
        }
    }

    postVadaAction(formdata, type){
        this.api.postVadaAction(formdata).subscribe(data => {
            data = JSON.parse(data);
            if(data.success){
                this.toast();
            }else{
                this.toast('שגיאה', data.message, 'error');
                return;
            }
            if(type == 'pdfSing'){
                this.viewSeder = true;
                this.pdfUrlIfram = this._sanitizer.bypassSecurityTrustResourceUrl(data.url);
                return;
            }
            if(type == 'pdfSingSeder'){
                this.viewSeder = true;
                this.pdfUrlIfram = this._sanitizer.bypassSecurityTrustResourceUrl(data.url);
                return;
            }
            if(type == 'cancel'){
                this.router.navigate(['/rechesh/dashboard']);
            } 
            
            if(type == 'drisha_approve'){
                this.vadaDialogSingleDrishaApprove = false;
            }
            if(type == 'cancel_seder'){
                this.vadaDialogCancelSeder = false;
            }
            if(type == 'edit_vada_details'){
                this.vadaDialogEditVada = false;
            }
            if(type == 'insert_drishot'){
                window.location.reload();
            }
            this.setupTableData();
        });
    }

    drishaDecide(type, event){
        this.ref = this.dialogService.open(DDecideComponent, {
            header: 'החלטת ועדה',
            width: '1000px',
            styleClass: 'dialogNoPadding',
            data: {
                item: event,
                decide: type,
                vada: this.dataTable.initData,
            }
        });
        this.ref.onClose.subscribe((event: any) => {
            if(event == 'update_status'){
                this.setupTableData();
            }
        });
    }

    quickDecide(rowData){
        let quickFormSend:any = {};
        quickFormSend.drisha = rowData;
        quickFormSend.vada_status = this.dataTable.initData.VDSTTS;
        quickFormSend.note1 = 'התקיים דיון בוועדה';
        quickFormSend.note2 = 'דרישת הרכש מאושרת לביצוע';
        quickFormSend.decide = {};
        quickFormSend.decide.code = 1;
        this.api.postDecide(JSON.stringify(quickFormSend)).subscribe(data => {
            if(data.success){
                this.setupTableData();
                this.toast('בוצע בהצלחה', 'הועדה התווספה בהצלחה');
            }else{
                this.toast('שגיאה', data.message, 'error');
            }
        });
    }

    openPritim(event){
        this.ref = this.dialogService.open(DPritimComponent, {
            header: 'הצגת פריטים בדרישה: '+event.DRTEUR,
            width: '1300px',
            styleClass: 'dialogNoPadding',
            data: event
        });
    }

    editVada() {
        this.ref = this.dialogService.open(DVadaComponent, {
            header: 'עריכת ועדה',
            width: '900px',
            styleClass: 'dialogNoPadding',
            data: {formData: this.dataTable.initData}
        });
        this.ref.onClose.subscribe((event: any) => {
            if(event == 'edit'){
                this.setupTableData();
            }
        });
    }

    openNotes(item) {
        this.ref = this.dialogService.open(NotesComponent, {
            header: 'הודעות והערות',
            width: '1000px',
            styleClass: 'dialogNoPadding',
            data: {
                item: {
                    'assg' : '1',
                    'lib' : 'LG',
                    'asmx' : item.DRDRNO,
                    'sug' : '1',
                    'DRFRUS' : item.DRFRUS,
                },
                json: [
                    {
                        value: 'דרישת טובין',
                    },{
                        name: 'מספר דרישה',
                        value: item.DRDRNO,
                    },{
                        name: 'סוג דרישה',
                        value: 'טובין',
                    }
                ],
            }
        });
    }

    openSignatures(item){
        let dateFormatPipeFilter:any = new dateNumbersPipe();
        this.ref = this.dialogService.open(SignaturesComponent, {
            header: 'סדר חתימות',
            width: '1000px',
            styleClass: 'dialogNoPadding',
            data: {
                item: {
                    'assg' : '1',
                    'lib' : 'LG',
                    'asmx' : item.DRDRNO,
                    'sug' : '1',
                    'DRFRUS' : item.DRFRUS,
                },
                json: [
                    {
                        value: 'דרישת טובין',
                    },{
                        name: 'מספר דרישה',
                        value: item.DRDRNO,
                    },{
                        name: 'סוג דרישה',
                        value: 'טובין',
                    }
                ],
                jsonSub: [
                    {
                        name: 'תאור',
                        value: item.DRTEUR,
                    }
                    ,{
                        name: 'תאריך',
                        value: dateFormatPipeFilter.transform(item.DRDATE, 'dateNumbers'),
                    },{
                        name: 'עלות',
                        value: '₪'+item.DRTTAL,
                    }
                ],
            }
        });
    }

    toast(title = 'הערת המערכת', msg = 'בוצע בהצלחה', status = 'success') {
        this.messageService.add({ severity: status, summary: title, detail: msg, life: 6000 });
    }

    openManageVada(event){
        this.manageVada = event;
        if(this.manageVada){
            this.dataTable.buttons = [];
        }else{
            this.clearSearch();
            this.setupTableData();
        }
    }
    
    setupTableData(params = {}) {
        this.api.getVada(this.id, params).subscribe(data => {
            this.dataTable = data;
            this.dataTable.buttons = this.dataTable.buttons ? this.dataTable.buttons : [];
            if(this.dataTable.initData.VDSTTS.trim() == 1){
                this.dataTable.buttons = [
                    {
                        "type": "button",
                        "label": "הצגה",
                        "icon": "eye",
                        "event": "display"
                    }
                ];
            }else if(this.dataTable.initData.VDSTTS.trim() == 3){
                this.dataTable.buttons = [
                    {
                        "type": "button",
                        "label": "החלטות",
                        "icon": "stamp",
                        "event": "decide"
                    }
                ];
            }
            
            this.dataTable.menu = this.dataTable.menu ? this.dataTable.menu : [];
            this.dataTable.menu.push(
                {
                    "type": "button",
                    "label": "הודעות והערות",
                    "icon": "pi-comment",
                    "event": "messages",
                }
            );
            this.dataTable.menu.push(
                {
                    "type": "button",
                    "label": "סדר חתימות",
                    "icon": "pi-pencil",
                    "event": "signatures",
                }
            );
            this.dataTable.menu.push(
                {
                    "type": "button",
                    "label": "ארכיב אופטי",
                    "icon": "pi-paperclip",
                    "event": "archive",
                }
            );
            if(this.dataTable.initData.VDSTTS == 1){
                this.dataTable.menu.push(
                    {
                        "type": "button",
                        "label": "הוצאה מועדה",
                        "icon": "pi-sign-out",
                        "event": "drisha_out",
                    }
                );
            }
            this.sumStatus.open = this.dataTable.data.filter(t=>t.DRSTTR.trim() == 'מאושר').length;
            this.sumStatus.left = this.dataTable.data.filter(t=>t.DRSTTR.trim() == 'התקבל לועדת קניות').length;
            this.sumStatus.all = this.groupByArray(this.dataTable.data, 'DRSTTR');
            this.sumStatus.arr = [];
            this.sumStatus.arr.push(
                {
                    name: 'הכל',
                    status: 7
                },{
                    name: 'מאושר',
                    status: 4 
                },{
                    name: 'לא מאושר',
                    status: 3
                },{
                    name: 'מותנה',
                    status: 5
                },{
                    name: 'ללא סטטוס',
                    status: 2
                }
            );
            //set status
            if(this.dataTable.initData.VDSTTS.trim() == 1 && this.dataTable.totalrows > 0){
                this.vadaStatus = 2; //2=open with drishot
            }
            if(this.dataTable.initData.VDSTTS.trim() == 2 && this.dataTable.totalrows > 0){
                this.vadaStatus = 3; //seder open
            }
            if(this.dataTable.initData.VDSTTS.trim() == 2 && this.dataTable.totalrows > 0 && this.dataTable.initData.DSSTTS == 0){
                this.vadaStatus = 4; //seder sign 
            }
            if(this.dataTable.initData.VDSTTS.trim() == 2 && this.dataTable.totalrows > 0 && this.dataTable.initData.DSSTTS == 2){
                this.vadaStatus = 5; //seder finish sign not allowd
            }
            if(this.dataTable.initData.VDSTTS.trim() == 2 && this.dataTable.totalrows > 0 && this.dataTable.initData.DSSTTS == 1){
                this.vadaStatus = 6; //seder finish sign
            }
            if(this.dataTable.initData.VDSTTS.trim() == 2 && this.dataTable.totalrows > 0 && this.dataTable.initData.DSSTTS == 1  && this.sumStatus.left < 1){
                this.vadaStatus = 7; //seder yom finish decide and sign
            }
            if(this.dataTable.initData.VDSTTS.trim() == 3 && this.sumStatus.left < 1){
                this.vadaStatus = 8; //open protocol
                this.pdfUrlIfram = null;
            }
            if(this.dataTable.initData.VDSTTS.trim() == 3 && this.sumStatus.left < 1 && this.dataTable.initData.DSSTTS == 0){
                this.vadaStatus = 9; //protocl in sign
                this.pdfUrlIfram = null;
            }
            if(this.dataTable.initData.VDSTTS.trim() == 3 && this.sumStatus.left < 1 && this.dataTable.initData.DSSTTS == 2){
                this.vadaStatus = 10; //protocol not allowd 
            }
            if(this.dataTable.initData.VDSTTS.trim() == 3 && this.sumStatus.left < 1 && this.dataTable.initData.DSSTTS == 1){
                this.vadaStatus = 11; //protocl finish 
            }

            if(this.sumStatus.left < 1){
                this.vadaClosed = true;
            }
            this.readyToManageVada = false;
            if(this.dataTable.initData.DSSTTS){
                //ready to manage vada
                if(this.dataTable.initData.VDSTTS.trim() == 2 && this.dataTable.initData.DSSTTS == '1'){
                    this.readyToManageVada = true;
                }
                this.vada_status = this.dataTable.initData.VDSTTS.trim() == 2 ? 'סדר יום ' : 'פרוטוקול ';
                if(this.dataTable.initData.DSSTTS == 0){
                    this.vada_status += 'בחתימות ';
                }else if(this.dataTable.initData.DSSTTS == 1){
                    this.vada_status += 'חתום ';
                }else if(this.dataTable.initData.DSSTTS == 2){
                    this.vada_status += 'לא אושר ';
                }
            }else{
                this.vada_status = this.dataTable.initData.VDSTTR;
            }
            this.dataTable.initData.TSKTSRY = this.dataTable.initData.TSKTSRY.trim();
            this.dataTable.initData.TSKTPRT = this.dataTable.initData.TSKTPRT.trim();
        });
    }

    groupByArray(xs, key) { return xs.reduce(function (rv, x) { let v = key instanceof Function ? key(x) : x[key]; let el = rv.find((r) => r && r.key === v); if (el) { el.values.push(x); } else { rv.push({ key: v, values: [x] }); } return rv; }, []); }

    backButton(){
        this._location.back();
    }

    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          return false;
        }
        return true;
    }

    selectStatus(event){
        if(event.value && event.value != ''){
            if(event.value.status == 5){
                this.router.navigate([], {queryParams: {'status': 3, 'mutne': 1}});
            }else if(event.value.status == 3){
                this.router.navigate([], {queryParams: {'status': 3, 'mutne': 0}});
            }else if(event.value.status == 7){
                this.router.navigate([]);
            }else{
                this.router.navigate([], {queryParams: {'status': event.value.status, 'mutne': 0}});
            }
        }
    }

}
