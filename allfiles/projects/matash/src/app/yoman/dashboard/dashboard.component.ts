import { Component, OnInit, Inject} from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { yoman_apiService } from '../yoman_api.service';
import { PkudaUploadComponent } from '../../shared/dialogs/pkuda-upload/pkuda-upload.component';
import { Router, ActivationEnd } from '@angular/router';
import { CoreService } from 'core';
import { lastValueFrom } from 'rxjs';
import * as ExcelJS from 'exceljs'; 

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    showFilters: boolean = false;
    dataTable: any = [];
    ref: DynamicDialogRef;
    sum3 = [{ title: 'שבועי', sum: '0' }, { title: 'חודשי', sum: '0' }, { title: 'שנתי', sum: '0' }];
    usr:any = "";

    constructor(       
        private router: Router,
        public dialogService: DialogService,
        public api: yoman_apiService,
        @Inject(CoreService) private coreApi,
    ) {
        this.router.events.subscribe((event) => {
            if (event instanceof ActivationEnd) {
                if (this.ref) this.ref.close();
                //this.setupTableData();
            }
        });
    }

    ngOnInit() {
        this.usr="zakeny";
        this.coreApi.getUser().subscribe(data => {   
            this.usr = data.data.name;                            
        });       
        this.setupTableData();
    }

    newPkuda() {
        this.ref = this.dialogService.open(PkudaUploadComponent, {
            header: 'יבוא פקודות יומן מאקסל כפקודת יומן אגפית',
            width: '800px',
            styleClass: 'dialogNoPadding',
        });
    }

    rowClick(event) {
        console.log(event)
    }

    actionClick(event) {
        console.log(event);
              
        if (event.button.label == 'מחיקה') {
            if (!confirm("מאשר מחיקה?")) return;
            this.api.delPKUDA(event.item.YMYEAR, event.item.YMPKDA).subscribe(data => {
                this.setupTableData();
            });
        }

        if (event.button.label == 'אישור') {
            if (event.item.YMSTTS == 9) {
                alert('לא ניתן לאשר פקודה שגויה');
                return;
            }
            if (!confirm("מאשר?")) return;
            this.api.isrPY(event.item.YMYEAR, event.item.YMPKDA).subscribe(data => {
                this.setupTableData();
            });
        }

        if (event.button.label == 'טופס') {
            this.exlPKUDA_TOFES(event.item.YMYEAR, event.item.YMPKDA);
        }

        if (event.button.label == 'מסמכים') {
           // alert(this.usr);
            let docName: any = event.item.YMYEAR + "-" +  event.item.YMPKDA;
            let url: any = "http://jerarchiveviewer/ArchiveInputDocs.html?SystemId=99&archiveid=306&tiknum=" + docName
                           + "&username=" + this.usr + "&outside=true";
            window.open(url);          
        }
    }

    setupTableData() {
        let year = new Date().getFullYear();
        this.api.getPY_HDRS(year).subscribe(data => {
            this.dataTable = data;

            this.dataTable.menu.push({
                "type": "button",
                "label": "אישור",
                "icon": "check",
                "class": "surface",
            }, {
                "type": "button",
                "label": "טופס",
                "icon": "invoice",
                "class": "bg-secondary",
            },{
                "type": "button",
                "label": "מסמכים",
                "icon": "invoice",
                "class": "bg-secondary",
            },  
            {
                "type": "button",
                "label": "מחיקה",
                "icon": "delete",
                "class": "surface-800",
            });
        });
    }

    toggleFilters() {
        this.showFilters = !this.showFilters;
    }

    async exlPKUDA_TOFES(y, p) {
        let rows: any = [];
        let o: any = await lastValueFrom(this.api.imp400(y, p));
        rows = o.data;

        const wb = new ExcelJS.Workbook();
        const ws = wb.addWorksheet('Sheet1');  

        this.setHDR_PKUDA(ws,p);
        let exlR = ws.addRow(['חשבון', 'תאור', 'אסמכתא', 'פרטים', 'סכום']); this.setFontBold(exlR, 14);

        ws.addRow([]); //BLANK ROW at
        exlR = ws.addRow(['חובה','','','','']); this.setFontBold(exlR, 14);
        for (var i = 0; i < rows.length; i++) {
            const row = rows[i];
            if (row.HZ == "1") continue;  
            if (this.isNumeric(row.ASM))  row.ASM = Number(row.ASM)  
            ws.addRow([Number(row.HNHVA), row.HNHVAT, row.ASM, row.TUR, Number(row.SCMHVA)]);
        }
        exlR = ws.addRow(["", "", "", "סך חובה", Number(o.sum_hva)]); this.setFontBold(exlR, 14);
        ws.addRow([]); //BLANK ROW

        exlR = ws.addRow(['זכות','','','','']); this.setFontBold(exlR, 14);
        for (var i = 0; i < rows.length; i++) {
            const row = rows[i];
            if (row.HZ == "2") continue;            
            if (this.isNumeric(row.ASM))  row.ASM = Number(row.ASM)  
            ws.addRow([Number(row.HNZCT), row.HNZCTT, row.ASM, row.TUR, Number(row.SCMZCT)]);
        }
        exlR = ws.addRow(["","", "", "סך זכות",  Number(o.sum_zct)]); this.setFontBold(exlR, 14);  

        let col = ws.getColumn('E');        
        col.eachCell((cell) => { cell.numFmt = '#,##0.00';});

        this.borderWS(ws);
        this.colorWS(ws);
        await  wb.xlsx.writeBuffer().then(buffer => { this.saveAsExcelFile(buffer, 'sample'); });
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        const a: HTMLAnchorElement = document.createElement('a');
        document.body.appendChild(a);
        const url: string = window.URL.createObjectURL(data);
        a.href = url;
        a.download = `${fileName}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }

    private setHDR_PKUDA(ws,p){
        ws.mergeCells("A1:E1");
        let hdrCELL = ws.getRow(1).getCell(1);
        hdrCELL.value = "פקודה: " + p;
        hdrCELL.font = {bold: true };
        hdrCELL.font = {size: 16};

        hdrCELL.alignment = {horizontal: 'center' };
    }

    private setFontBold(rEXL, sz) {
        rEXL.font = { bold: true };
        rEXL.eachCell(cell => { cell.font = { size: sz }; });
    }

    private borderWS(ws) {
        ws.eachRow((row, rowNumber) => {
            row.eachCell((cell) => {                
                cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
            });
        });
    }

    private colorWS(ws) {
        let clr = "ccffe5";
        ws.eachRow((row) => {            
            row.eachCell((cell) => { 
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: clr }};               
            });
            clr = "f9f6f6";
        });
    }

    private  isNumeric(val) {
        return !isNaN(Number(val));
    }

    
}
