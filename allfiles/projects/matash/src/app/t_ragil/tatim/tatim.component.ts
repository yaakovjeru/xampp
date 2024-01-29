import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ragil_apiService } from '../t_ragil_api.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddTatSaifComponent } from '../../shared/dialogs/add-tat-saif/add-tat-saif.component';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-tatim',
  templateUrl: './tatim.component.html',
  // styleUrls: ['./tatim.component.scss'],
  providers: [DecimalPipe]
})
export class TatimComponent {

  dtTATIM: any = [];
  fndHN: any = "0"; fndTUR: any = ""; fndY4: any = "";
  cols: any[] = [];
  data: any[] = [];
  tatData: any;
  tkSaif: any;
  tkYear: any;
  tkScum: any;
  tkTeur: any;
  ref: DynamicDialogRef;
  formattedNumber: any;

  constructor(
    private route: ActivatedRoute,
    public api: ragil_apiService,
    public dialogService: DialogService,
    private decimalPipe: DecimalPipe,
  ) { };

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.tkSaif = params.get('TKSAIF');
      this.tkYear = params.get('TKYEAR');
      this.tkScum = params.get('TKSCUM');
      this.tkTeur = params.get('TKTEUR');
    });
    this.formattedNumber = this.decimalPipe.transform(parseFloat(this.tkScum), '1.0-0');
    this.getTATEY_SEIFIM()
  }

  async getTATEY_SEIFIM() {
    this.dtTATIM = await lastValueFrom(this.api.getSEIF_TATIM(this.tkYear, this.tkSaif));
    this.dtTATIM.buttons.push({
      "type": "button",
      "label": "מחיקה",
      "icon": "delete",
      "class": "surface-800",
    });
    this.cols = this.dtTATIM.cols;
    this.data = this.dtTATIM.data;
    console.log(this.dtTATIM)
  }

  onRowEditSave(event) {
    this.tatData = event;
    console.log(event);

    this.tatData.MOD = "UPD";
    // this.dtTATIM = this.api.crudROW(this.fndY4, this.tatData).subscribe(data => {
    // });
  }

  addTatSaif() {
    console.log(this.tkSaif);
    this.ref = this.dialogService.open(AddTatSaifComponent, {
      header: 'סעיף '+ this.tkSaif + ' ' + this.tkTeur + ' - הוספת תת סעיף חדש',
      width: '800px',
      contentStyle: {
        'max-height': '500px',
        'overflow': 'auto'
      },
      data: {
        TKSAIF: this.tkSaif,
      }
    });
  }

   // this.tatData.MOD = "UPD";
    // this.dtTATIM = this.api.crudROW(this.fndY4, this.tatData).subscribe(data => {
    // });
  

}
