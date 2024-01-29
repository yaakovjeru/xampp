import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { yoman_apiService } from '../../../yoman/yoman_api.service';
import { lastValueFrom } from 'rxjs';
import { formatDate } from "@angular/common";
import { Router, ActivationEnd } from '@angular/router';


@Component({
  selector: 'app-pkuda-dup',
  templateUrl: './pkuda-dup.component.html',
  styleUrls: ['./pkuda-dup.component.scss']
})

export class PkudaDupComponent implements OnInit {
  btnLABEL: any;
  formData: any = [];
  dataTable: any = [];
  dmy: any;
  pkudaCPY: any = "0";
  fndHN: any = "0"; fndTUR: any = ""; fndY4: any = ""; fndPY: any = "";
  constructor(private router: Router, public ref: DynamicDialogRef, public config: DynamicDialogConfig, public api: yoman_apiService) {
    this.formData = config.data;
    this.router.events.subscribe((event) => {
      if (event instanceof ActivationEnd) {
        if (this.ref) this.ref.close();
      }
    });

  }

  ngOnInit() {
    this.dmy = formatDate(this.formData.date, 'dd-MM-yyyy', 'en-US');
    this.fndY4 = this.formData.year;
    this.btnLABEL = "חפש";
  }

  async getHN_LIST() {
    this.dataTable = await lastValueFrom(this.api.getTN_HNH(this.fndY4, this.fndHN, this.fndTUR, this.pkudaCPY));
    this.fndHN = "";
    this.fndTUR = "";    
  }

  rowClick(event) {
    console.log(event)
  }

  actionClick(event: any) {
    if (event.button.label == "בחירה") {
      this.pkudaCPY = event.item.PKUDA;
      this.dataTable = [];     
      this.btnLABEL = "הצג פקודה";
      
    }
  }

  async doCPY_PKUDA() {
    const [d, m, y] = this.dmy.split('-');
   // let dmy: string = d + "." + m + "." + y;
    let ymd: string = y + m + d;

    let rt = await lastValueFrom(this.api.addPY_HDR(this.formData.year, this.formData.pkuda, ymd));
    if (rt.stt != "ADD HDR OK") return;
    rt = await lastValueFrom(this.api.cpyPY(this.fndY4, this.pkudaCPY, this.formData.year, this.formData.pkuda));
    alert(rt.stt);
    this.router.navigate(['/yoman/pkuda/' + this.formData.year + '/' + this.formData.pkuda]);
  }
}
