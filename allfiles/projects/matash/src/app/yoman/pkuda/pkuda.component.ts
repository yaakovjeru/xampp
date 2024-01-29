import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { yoman_apiService } from '../yoman_api.service';
import { lastValueFrom } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TnuaDialogComponent } from '../../shared/dialogs/tnua/tnua.component';

@Component({
    selector: 'app-pkuda',
    templateUrl: './pkuda.component.html',
    styleUrls: ['./pkuda.component.scss']
})
export class PkudaComponent {

    year: string | null;
    pkuda_id: string | null;;
    showFilters: boolean = false;
    errPKUDA: string | null;
    dataTable: any = [];
    oPY_ROW: any = [];
    ref: DynamicDialogRef;

    constructor(
        public dialogService: DialogService, public api: yoman_apiService, private route: ActivatedRoute) {
        this.route.paramMap.subscribe(paramMap => {
            this.year = paramMap.get('year');
            this.pkuda_id = paramMap.get('id');
        })
    }

    ngOnInit() {        
        this.getPkuda();        
    }

    getPkuda(openNewLine: any = false) {
        this.api.imp400(this.year, this.pkuda_id).subscribe(data => {
            this.dataTable = data;

            if (!this.dataTable.buttons) {
                this.dataTable.buttons = [];
            }
            this.dataTable.buttons.push({
                "type": "button",
                "label": "עריכה",
                "icon": "edit",
                "class": "surface",
            });
            if (openNewLine) {
                let newItem = { item: this.dataTable.data.find(o => o.SRA == openNewLine) }
                this.editTnua(newItem);
            }
        });
    }

    async newTnua(type) {
        this.oPY_ROW.PKDA = this.pkuda_id;
        this.oPY_ROW.Y4 = this.year;
        if (type == 1) this.oPY_ROW.HZ = "1";
        if (type == 2) this.oPY_ROW.HZ = "2";
        if (type == 3) this.oPY_ROW.HZ = "3";

        let ln: number = this.dataTable.data.length + 1;        
        await lastValueFrom(this.api.newEMPY_ROW(this.year, this.pkuda_id, ln, type));
        this.getPkuda(ln);
    }

    editTnua(event) {
        console.log(event)
        this.ref = this.dialogService.open(TnuaDialogComponent, {
            header: 'עריכת תנועה', width: '1000px', styleClass: 'dialogNoPadding',
            data: event.item
        });
        this.ref.onClose.subscribe((action: any) => {
            this.getPkuda();
        });
    }    

}
