import { Component, Input, Output, ContentChild, TemplateRef, EventEmitter, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as FileSaver from 'file-saver'
import { Table } from 'primeng/table';

@Component({
  selector: 'lib-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

    @Input() dataTable:any;
    @Input() tableClass: any;
    @Input() rowClass: any;
    @Input() header:any = true;
    @Input() export: any = true;
    @Input() rows: any = 10;
    @Input() lazy: any = false;
    @Input() title: any;
    @Input() pagination_url: boolean = false;
    
    @Output() onLazyLoad = new EventEmitter<any>();
    @Output() onRowClick = new EventEmitter<any>();
    @Output() onActionsClick = new EventEmitter<any>();

    @ContentChild('actions') actions: TemplateRef<any>;
    @ContentChild('mainButtons') mainButtons: TemplateRef<any>;
    @ContentChild('mainButtonsRight') mainButtonsRight: TemplateRef<any>;
    
    showFilters: boolean = false;
    loading: boolean;
    queryParams:any = {};
    colsNames:any = [];
    isLoading: boolean = true;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
    ){
        this.route.queryParams.subscribe(params => {
            this.queryParams.first = Number(params['first']);
            this.queryParams.rows = Number(params['rows']);
            this.queryParams.sortOrder = params['sortOrder'];
            this.queryParams.sortField = params['sortField'];
        });
    }

    ngOnInit(){}

    ngOnChanges() {
        if(this.dataTable.cols){
            this.isLoading = false;
            this.dataTable.cols.forEach(element => {
                this.colsNames.push(element.FIELD)
            });
        }
    }

    @HostListener('document:keyup', ['$event'])
    handleDeleteKeyboardEvent(event: KeyboardEvent) {
        if(event.key === 'PageDown'){
            let c_next_all:any = document.querySelectorAll<any>('.p-paginator-next');
            let c_next = c_next_all[c_next_all.length- 1];
            c_next.click();
        }
        if(event.key === 'PageUp'){
            let c_next_all:any = document.querySelectorAll<any>('.p-paginator-prev');
            let c_next = c_next_all[c_next_all.length- 1];
            c_next.click();
        }
        if(event.key === 'End'){
            let c_next_all:any = document.querySelectorAll<any>('.p-paginator-last');
            let c_next = c_next_all[c_next_all.length- 1];
            c_next.click();
        }
        if(event.key === 'Home'){
            let c_next_all:any = document.querySelectorAll<any>('.p-paginator-first');
            let c_next = c_next_all[c_next_all.length- 1];
            c_next.click();
        }
    }

    toggleFilters() {
        this.showFilters = !this.showFilters;
    }

    clear(table: Table) {
        table.clear();
    }

    menuOpenContent(row:any){
        if(!this.dataTable.menu) return false;
        const menuOpen:any = [
            {
                label: 'פעולות נוספות',
                items: []
            }
        ];
        this.dataTable.menu.forEach(element => {
            menuOpen[0].items.push({
                label: element.label,
                icon: 'pi '+element.icon,
                command: (e) => {
                    this.openButton(row, element);
                }
            });
        });
        return menuOpen;
    }
    
    openButton(row, button){
        if(!button.label){
            alert('empty');
            return;
        }else if(button.url && button.url != ''){
            window.location.href = button.route;
        }else if(button.route && button.route != ''){
            let link_params = new Array();
            for (let key in button.params) {
                link_params.push(row[button.params[key]])
            }
            this.router.navigate([button.route, ...link_params]);
        }else if(button.type && button.type == 'overlayPanel'){
            
        }else{
            this.onActionsClick.emit({item: row, button: button}); 
        }
    }

    getHeaderCellClass(column: any) {
        let cssClass = '';
        cssClass += ' '+this.rowClass;
        // divider cell based on column data
        cssClass += Number(column.GROUPDIVIDER) ? ' group-divider-cell' : '';
        cssClass += Number(column.DIVIDER) ? ' divider-cell' : '';
        return cssClass;
    }
    
    getCellClass(column: any, rowData:any) {
        let cssClass = '';
        //divider cell based on column data
        cssClass += ' '+this.rowClass;
        cssClass += Number(column.GROUPDIVIDER) ? ' group-divider-cell' : '';
        cssClass += Number(column.DIVIDER) ? ' divider-cell' : '';
        // cell classes based on column and rowData
        if (column.BG && column.BG.trim() != '') {
            if(rowData[column.FIELD] == 0){
                return;
            }
            cssClass += ' bg-'+column.BG;
        }
        //BG_CONDITION
        if(column.BG_CONDITION && column.BG_CONDITION.length > 0){
            for (let index = 0; index < column.BG_CONDITION.length; index++) {
                if(rowData[column.FIELD].trim() == column.BG_CONDITION[index].VALUE){
                    cssClass += ' '+column.BG_CONDITION[index].CLASS;
                }
            }
        }
        //cssClass += (column.FIELD == 'status' && rowData.id <= 2) ? ' text-primary' : '';
        //cssClass += (column.FIELD == 'amount' && rowData.id > 1) ? ' text-error' : '';
        return cssClass;
    }

    getCellContentClass(column: any, rowData:any) {
        let cssClass = '';
        if (column.CLASS && column.CLASS.trim() != '') {
            if(rowData[column.FIELD] == 0){
                return;
            }
            cssClass += ' '+column.CLASS;
        }
        if (column.CLASS_CONDITION && column.CLASS_CONDITION.VALUE.trim() != '') {
            if(rowData[column.FIELD].trim() == column.CLASS_CONDITION.VALUE){
                cssClass += ' '+column.CLASS_CONDITION.CLASS;
            }else{
                return;
            }
        }
        return cssClass;
    }

    nextPage(event: any){
        if(this.pagination_url){
            this.router.navigate([], {
                relativeTo: this.route,
                queryParams: {
                    first: event.first,
                    rows: event.rows,
                    sortField: event.sortField,
                    sortOrder: event.sortOrder,
                },
                queryParamsHandling: 'merge',
            });
        }
    }

    isObj(value){
        if(typeof value === 'object'){
          return true;
        }else{
          return false;
        }
    }

    exportExcel(){
        // console.log(this.dataTable.data)
        let xml_json:any = [];
        this.dataTable.data.forEach(element => {
            for (const key in element){
                console.log(key);
            }
            xml_json.push(element);
        });
        // console.log(xml_json)

        return;
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(this.dataTable.data);
            const workbook = { 
                Sheets: { data: worksheet }, 
                SheetNames: ['data'] 
            };
            const excelBuffer: any = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array',
            });
            this.saveAsExcelFile(excelBuffer, 'tutorials');
        });
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE,
        });
        FileSaver.saveAs(
            data,
            fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
        );
    }

}
