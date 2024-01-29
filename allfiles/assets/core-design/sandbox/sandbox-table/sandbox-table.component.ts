import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'sandbox-table',
    templateUrl: './sandbox-table.component.html'
})

export class SandboxTableComponent implements OnInit {

    showFilters: boolean = false;
    sampleTableData!: object[];
    sampleTableColumns!: object[];

    ngOnInit() {
        this.setupTableData()
    }

    setupTableData() {
        this.sampleTableData = [
            { id: 1, year: '2001', date: '20.1.1975', type: 'ירוק', description: 'לורם איפסום...', amount: 345, status: 'ממתין' },
            { id: 2, year: '2002', date: '20.2.1975', type: 'ירוק', description: 'לורם איפסום...', amount: 12.75, status: 'מאושר' },
            { id: 3, year: '2003', date: '20.3.1975', type: 'אדום', description: 'לורם איפסום...', amount: 156, status: 'נדחה' },
            { id: 4, year: '2004', date: '20.4.1975', type: 'אדום', description: 'לורם איפסום...', amount: 0.75, status: 'אחר' },
        ]

        this.sampleTableColumns = [
            { field: 'id', header: "מס'" },
            { field: 'year', header: 'שנה', isDividerCell: true },
            { field: 'date', header: 'תאריך' },
            { field: 'type', header: 'סוג', isGroupDividerCell: true },
            { field: 'description', header: 'תיאור' },
            { field: 'amount', header: 'סכום' },
            { field: 'status', header: 'סטטוס' },
        ];
    }

    toggleFilters() {
        this.showFilters = !this.showFilters;
    }

    getHeaderCellClass(column: any) {
        let cssClass = '';

        // divider cell based on column data
        cssClass += column.isGroupDividerCell ? ' group-divider-cell' : '';
        cssClass += column.isDividerCell ? ' divider-cell' : '';
        return cssClass;
    }

    getCellClass(rowData: any, column: any) {
        let cssClass = '';

        // divider cell based on column data
        cssClass += column.isGroupDividerCell ? ' group-divider-cell' : '';
        cssClass += column.isDividerCell ? ' divider-cell' : '';

        // cell classes based on column and rowData
        if (column.field == 'type') {
            cssClass += rowData.id <= 2 ? ' cell--primary' : ' cell--error';
        }
        cssClass += (column.field == 'status' && rowData.id <= 2) ? ' text-primary' : '';
        cssClass += (column.field == 'amount' && rowData.id > 1) ? ' text-error' : '';

        return cssClass;
    }
}