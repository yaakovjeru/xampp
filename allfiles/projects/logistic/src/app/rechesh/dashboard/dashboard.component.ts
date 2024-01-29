import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { apiRecheshService } from '../apiRechesh.service';
import { Router, ActivationEnd } from '@angular/router';
import { DVadaComponent } from '../shared/dialogs/d-vada/d-vada.component';
import { CoreService, NotesComponent, SearchComponent, SignaturesComponent, dateNumbersPipe } from 'core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    
    showFilters: boolean = false;
    dataTable: any = [];
    ref: DynamicDialogRef;
    
    constructor(
        private router: Router,
        public dialogService: DialogService,
        public api: apiRecheshService
    ){
        this.router.events.subscribe((event) => {
            if (event instanceof ActivationEnd) {
                if(this.ref) this.ref.close();
            }          
        });
    }
    
    ngOnInit() {
        this.setupTableData();
    }
    
    newVada(formData) {
        this.ref = this.dialogService.open(DVadaComponent, {
            header: formData ? 'עריכת ועדה' : 'הוספת ועדה חדשה',
            width: '900px',
            styleClass: 'dialogNoPadding',
            data: {
                initData: this.dataTable.initData,
                formData
            }
        });
        this.ref.onClose.subscribe((event: any) => {
            if(event == 'insert_new' || event == 'edit'){
                this.setupTableData();
            }
        });
        
    }
    
    rowClick(event){
        this.router.navigate(['/rechesh/vada/' + event.VDMSVD+'-'+event.VDDATE]);
    }
    
    actionClick(event){
        if(event.button.event == 'enter'){
            this.router.navigate(['/rechesh/vada/' + event.item.VDMSVD+'-'+event.item.VDDATE]);
        }
        if(event.button.event == 'messages10'){
            this.openNotes1(event.item);
        }
        if(event.button.event == 'messages11'){
            this.openNotes2(event.item);
        }
        if(event.button.event == 'signatures10'){
            this.openSignatures(event.item, 10);
        }
        if(event.button.event == 'signatures11'){
            this.openSignatures(event.item, 11);
        }
        if(event.button.label == 'עריכת ועדה'){
            this.newVada(event.item);
        }
        if(event.button.label == "ארכיב אופטי"){
            window.open("http://jerarchiveviewer/ArchiveInputDocs.html?SystemId=99&archiveid=308&outside=true&tiknum="+event.item.VDDATE.substring(0, 4)+"-1-"+event.item.VDMSVD, '_blank');
        }
    }

    openNotes1(item) {
        this.ref = this.dialogService.open(NotesComponent, {
            header: 'הודעות והערות',
            width: '1000px',
            styleClass: 'dialogNoPadding',
            data: {
                item: {
                    'assg' : '10',
                    'lib' : 'LG',
                    'asmx' : item.VDDATE.substring(0,4)+item.VDMSVD.padStart(6, '0'),
                    'sug' : '1',
                },
                json: [
                    {
                        value: 'ועדה סדר יום',
                    },{
                        name: 'מספר ועדה',
                        value: item.VDMSVD,
                    }
                ],
            }
        });
    }

    openNotes2(item) {
        this.ref = this.dialogService.open(NotesComponent, {
            header: 'הודעות והערות',
            width: '1000px',
            styleClass: 'dialogNoPadding',
            data: {
                item: {
                    'assg' : '11',
                    'lib' : 'LG',
                    'asmx' : item.VDDATE.substring(0,4)+item.VDMSVD.padStart(6, '0'),
                    'sug' : '1',
                },
                json: [
                    {
                        value: 'ועדה פרוטוקול',
                    },{
                        name: 'מספר ועדה',
                        value: item.VDMSVD,
                    }
                ],
            }
        });
    }

    openSignatures(item, type){
        let dateFormatPipeFilter:any = new dateNumbersPipe();
        let s_title = type == 10 ? 'סדר יום' : 'פרוטוקול';
        let s_assg = type == 10 ? '10' : '11';
        let s_asmx = (item.VDDATE).substring(0,4)+(item.VDMSVD).padStart(6 ,"0");
        this.ref = this.dialogService.open(SignaturesComponent, {
            header: 'סדר חתימות ועדה '+s_title,
            width: '1000px',
            styleClass: 'dialogNoPadding',
            data: {
                item: {
                    'assg' : s_assg,
                    'lib' : 'LG',
                    'asmx' : s_asmx,
                    'sug' : s_assg,
                    'DRFRUS' : '',
                },
                json: [
                    {
                        value: 'ועדה',
                    },{
                        name: 'מספר ועדה',
                        value: item.VDMSVD,
                    },{
                        name: 'תאריך ועדה',
                        value: dateFormatPipeFilter.transform(item.VDDATE, 'dateNumbers'),
                    }
                ]
            }
        });
    }
    
    setupTableData() {
        let year = new Date().getFullYear();
        this.api.getVadaAll().subscribe(data => {
            this.dataTable = data;
        });
    }
}
