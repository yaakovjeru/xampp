import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { apiService } from '../../api.service';
import { PkudaUploadComponent } from '../../shared/dialogs/pkuda-upload/pkuda-upload.component';
import { Router, ActivationEnd } from '@angular/router';

@Component({
  selector: 'app-drisha',
  templateUrl: './drisha.component.html',
  styleUrls: ['./drisha.component.scss']
})
export class DrishaComponent implements OnInit {
    
    showFilters: boolean = false;
    dataTable: any = [];
    ref: DynamicDialogRef;
    sum3 = 32;
    
    constructor(
        private router: Router,
        public dialogService: DialogService,
        public api: apiService
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
    
    newPkuda() {
        this.ref = this.dialogService.open(PkudaUploadComponent, {
            header: 'יבוא פקודות יומן מאקסל כפקודת יומן אגפית',
            width: '800px',
            styleClass: 'dialogNoPadding',
        });
    }
    
    rowClick(event){
        console.log(event)
    }
    
    actionClick(event){
        console.log(event)
        if(event.button.label == 'מחיקה'){
            if (!confirm("מאשר מחיקה?")) return;
            this.api.delPKUDA(event.item.YMYEAR, event.item.YMPKDA).subscribe(data => {
                this.setupTableData();
            });
        }
    }
    
    setupTableData() {
        let year = new Date().getFullYear();
        this.api.getPY_HDRS(year).subscribe(data => {
            this.dataTable = data;
            this.dataTable.buttons.push({
                "type": "button",
                "label": "אישור",
                "icon": "check",
                "class": "surface",
            },{
                "type": "button",
                "label": "מחיקה",
                "icon": "delete",
                "class": "surface-500",
            });
        });
    }
    
    toggleFilters() {
        this.showFilters = !this.showFilters;
    }
}
