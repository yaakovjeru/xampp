import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { apiService } from '../../../api.service';
import { lastValueFrom } from 'rxjs';
import { formatDate } from "@angular/common";
import { Router, ActivationEnd } from '@angular/router';


@Component({
  selector: 'app-pkuda-dup',
  templateUrl: './pkuda-dup.component.html',
  styleUrls: ['./pkuda-dup.component.scss']
})

export class PkudaDupComponent implements OnInit {

    formData: any = [];
    dataTable: any = [];
    dmy: any;
    pkudaCPY: any = "0";
    fndHN: any = "0"; fndTUR: any = ""; fndY4: any = ""; fndPY: any = "";
    constructor(private router: Router,public ref: DynamicDialogRef, public config: DynamicDialogConfig, public api: apiService) {
    this.formData = config.data;
    this.router.events.subscribe((event) => {
        if (event instanceof ActivationEnd) {          
            if(this.ref) this.ref.close();
        }          
    });
    
    }

    ngOnInit() {
    this.dmy = formatDate(this.formData.date, 'dd-MM-yyyy', 'en-US');
    this.fndY4 = this.formData.year;
    }

    async getHN_LIST() {
    this.dataTable = await lastValueFrom(this.api.getTN_HNH(this.fndY4, this.fndHN, this.fndTUR, this.fndPY));
    }

    rowClick(event) {
    console.log(event)
    }

    actionClick(event:any) {
        console.log(event)  
        //alert(event);
        if(event.button.label == "בחירה"){
            //if (!confirm("מאשר מחיקה?")) return;
            // this.api.delPKUDA(event.item.YMYEAR, event.item.YMPKDA).subscribe(data => {
            //     //this.setupTableData();
            // });
        }
    }

}
