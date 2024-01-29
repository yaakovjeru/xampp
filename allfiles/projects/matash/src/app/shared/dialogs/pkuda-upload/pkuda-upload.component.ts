import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { yoman_apiService } from '../../../yoman/yoman_api.service';
import { CoreService } from 'core';
import { lastValueFrom } from 'rxjs';
import { formatDate } from "@angular/common";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PkudaDupComponent } from '../../dialogs/pkuda-dup/pkuda-dup.component';

@Component({
  selector: 'app-pkuda-upload',
  templateUrl: './pkuda-upload.component.html',
  styleUrls: ['./pkuda-upload.component.scss']
})
export class PkudaUploadComponent {
    usr:any = "";
    excelData:any | null = null;
    excelPostData:any = [];
    dataTable:any = [];
    formData:any = [];
    fileIndex:any = [
        {"HEADER": "חשבון חובה", "FIELD": 'A',},
        {"HEADER": "פיצול חובה", "FIELD": 'B',},
        {"HEADER": "ח-ן זכות", "FIELD": 'C',},
        {"HEADER": "פיצול זכות", "FIELD": 'D',},
        {"HEADER": "זכות/חובה", "FIELD": 'E',},
        {"HEADER": "סכום חובה", "FIELD": 'F',},
        {"HEADER": "סכום זכות", "FIELD": 'G',},
        {"HEADER": "אסמכתא", "FIELD": 'H',},
        {"HEADER": "פרטים", "FIELD": 'I',}
    ];
    
    constructor(
        private api: yoman_apiService,
        @Inject(CoreService) private coreApi,
        public dialogService: DialogService,  
        private router: Router,
        private ref: DynamicDialogRef
     ){
        this.formData.year = new Date().getFullYear();
        this.formData.date = new Date();        
    }

    ngOnInit(){
        this.coreApi.getUser().subscribe(data => {   
            this.usr =   data.data.name;                     
                console.log(this.usr);
                this.getFREE_PKUDA();
            }
        )
    }

    async getFREE_PKUDA(){
        let rt = await lastValueFrom(this.api.getUSR_PKUDA_FREE(this.formData.year));
        this.formData.pkuda = rt.FREE_PKUDA;
    }

    upload(file){
        if (!file[0]) return;
        const selectedFile = file[0];  
        const fileReader = new FileReader();
    
        fileReader.onload = () => {
            const workbook = XLSX.read(fileReader.result, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            this.excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            let cols:any = [
                {"HEADER": "חשבון חובה", "FIELD": 0, "TYPE":"", "BG": ""},
                {"HEADER": "פיצול חובה", "FIELD": 1, "TYPE":"", "BG": ""},
                {"HEADER": "ח-ן זכות", "FIELD": 2,"TYPE":"", "BG": ""},
                {"HEADER": "פיצול זכות", "FIELD": 3,"TYPE":"", "BG": ""},
                {"HEADER": "ז/ח", "FIELD": 4,"TYPE":"", "BG": ""},
                {"HEADER": "סכום חובה", "FIELD": 5,"TYPE":"", "BG": ""},
                {"HEADER": "סכום זכות", "FIELD": 6,"TYPE":"", "BG": ""},
                {"HEADER": "אסמכתא", "FIELD": 7,"TYPE":"", "BG": ""},
                {"HEADER": "פרטים", "FIELD": 8,"TYPE":"", "BG": ""}
            ];
            this.dataTable['cols'] = cols;
            for (var i = 1; i < this.excelData.length; i++) {
                const row = this.excelData[i];
                if (row.length != 9) {
                    console.log(row);
                   // alert(i);
                    continue;
                }
                this.excelPostData.push(this.crtPKUDA_LINE(row, i));
            }           
            this.dataTable['data'] = this.excelData;            
            
        };
        fileReader.readAsBinaryString(selectedFile);
    }

    async saveFile(){
        if (!await this.chkPY_EXIST()) return;
        let ymd: string = formatDate(this.formData.date, 'yyyyMMdd', 'en-US');
        let result:any = await lastValueFrom(this.api.addPY_HDR(this.formData.year, this.formData.pkuda, ymd));
        if (result.stt != "ADD HDR OK") return;    
      
        await lastValueFrom(this.api.postEXL(this.formData.year, this.formData.pkuda, this.excelPostData));
    
        this.router.navigate(['/yoman/pkuda/' + this.formData.year + '/' + this.formData.pkuda]);
    }

    async pkudaNew(){
        if (!await this.chkPY_EXIST()) return;
        let ymd: string = formatDate(this.formData.date, 'yyyyMMdd', 'en-US');       
        let result = await lastValueFrom(this.api.addPY_HDR(this.formData.year, this.formData.pkuda, ymd));
        if (result.stt != "ADD HDR OK") return;
        this.router.navigate(['/yoman/pkuda/' + this.formData.year + '/' + this.formData.pkuda]);
    }

    async pkudaCopy(){
        if (!await this.chkPY_EXIST()) return;
        this.ref.close();
        let ymd: string = formatDate(this.formData.date, 'yyyyMMdd', 'en-US');
        this.ref = this.dialogService.open(PkudaDupComponent, {
            header: 'שכפול פקודה', width: '1200px', styleClass: 'dialogNoPadding',
            data: this.formData
        });              
       
        
    }

    chgYEAR(){      
        this.getFREE_PKUDA(); 
    }

    async chkPY_EXIST(){
        let data:any = await lastValueFrom(this.api.chkPY_EXIST(this.formData.year, this.formData.pkuda));
        if(data.opn_cls == null || data.opn_cls != "0"){
            alert('הפקודה לא הוגדרה ו/או תפוסה');
            return false;
        }
        return true;
    }

    crtPKUDA_LINE(row: any, sra: number) {
        let rEXL:any = {};
        rEXL.MOD = "NEW";
        rEXL.Y4 = this.formData.year;
        rEXL.PKDA = this.formData.pkuda;
        rEXL.SRA = sra;
        rEXL.HNHVAT = rEXL.HNZCTT = "...";
        rEXL.HNHVA = row[0]; if (rEXL.HNHVA == undefined) rEXL.HNHVA = "0";
        rEXL.PZLHVA = row[1]; if (rEXL.PZLHVA == undefined) rEXL.PZLHVA = "0";
        rEXL.HNZCT = row[2]; if (rEXL.HNZCT == undefined) rEXL.HNZCT = "0";
        rEXL.PZLZCT = row[3]; if (rEXL.PZLZCT == undefined) rEXL.PZLZCT = "0";
        rEXL.HZ = row[4];
        rEXL.SCMHVA = row[5]; if (rEXL.SCMHVA == undefined) rEXL.SCMHVA = "0";
        rEXL.SCMZCT = row[6]; if (rEXL.SCMZCT == undefined) rEXL.SCMZCT = "0";
        rEXL.ASM = row[7]; if (rEXL.ASM == undefined) rEXL.ASM = " ";
        rEXL.TUR = row[8]; if (rEXL.TUR == undefined) rEXL.TUR = " ";
        if (rEXL.TUR.length > 30) rEXL.TUR = rEXL.TUR.substring(0, 30);             
        return rEXL;
    }

    error(msg){
        alert(msg);
    }
}
