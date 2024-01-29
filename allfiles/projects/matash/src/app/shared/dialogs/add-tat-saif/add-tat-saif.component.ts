import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-tat-saif',
  templateUrl: './add-tat-saif.component.html',
  styleUrls: ['./add-tat-saif.component.scss']
})
export class AddTatSaifComponent implements OnInit {

  TKSAIF: any;
  TKNOSE: any;
  TKTRTT: any;
  isNotExist: boolean = false;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.TKSAIF = this.config.data.TKSAIF;
  }

  searchTat() {
    // this.api.searchTat(this.TKNOSE, this.TKTRTT).subscribe(data => {
      // if (data == null)
      // this.isNotExist = true;
    // });
    //חיפוש תת סעיף ע"י TKNOSE ו TKTRTT
    //אם לא קיים:
  }

  addNew() {
    //הוספה רוחבית לתת סעיף שאינו קיים
  }
}
