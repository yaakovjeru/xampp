import { Component, OnInit, Input, Output, EventEmitter, ComponentFactoryResolver } from '@angular/core';
// import { MenuItem, MessageService } from 'primeng/api';
// import { DropdownControl } from 'src/app/core/classes/dropdownControl';
// import { FormGroup, FormBuilder } from '@angular/forms';
// import { GeneralService } from '../general.service';
// import { IFavoritePage } from 'src/app/general/interfaces/favoritePage.interface';
// import { Router } from '@angular/router';
// import { DialogService } from 'primeng/dynamicdialog';
// import { InstituteAddComponent } from 'src/app/institute-module/pages/institute/institute-add/institute-add.component';
// import { ActivityAddComponent } from 'src/app/culture-module/pages/activities/activity-add/activity-add.component';
// import { SupplierAddComponent } from 'src/app/culture-module/pages/suppliers/supplier-add/supplier-add.component';
// import { SearchPageComponent } from '../extended-search/search-page/search-page.component';
// import { AuditoriumAddComponent } from 'src/app/culture-module/pages/auditorium/auditorium-add/auditorium-add.component';
// import { EdToastMessageComponent } from 'src/app/core/sharedComponents/ed-toast-message/ed-toast-message.component';
// import { InputText } from 'primeng/inputtext';
// import { InputTextControl } from 'src/app/core/classes/inputTextControl';
// import { ISysPage } from '../interfaces/sysPage.interface';
// import { BehaviorSubject } from 'rxjs';
// import { IRecentAction } from 'src/app/general/interfaces/recentAction.interface';
// import { SharedService } from 'src/app/services/shared.service';
// import { StylingService } from 'src/app/core/styling.service';
// import { time } from 'console';





@Component({
  selector: 'app-favorite-pages',
  templateUrl: './favorite-pages.component.html',
  // styleUrls: ['./ed-favorite-pages.component.scss']
})
export class FavoritePagesComponent implements OnInit {
  @Input() flag: boolean = false;
  @Output() moduleChanged: EventEmitter<any> = new EventEmitter<any>();
  // favoritePagesForm: FormGroup = {} as FormGroup;
  // //pagesList: IFavoritePage[] = [];
  // page: IFavoritePage = {} as IFavoritePage;
  // action: IRecentAction = {} as IRecentAction;
  // pagesList: IRecentAction[] = [];

  // pagesControl: InputTextControl = {
  //   key: 'page_id',
  //   label: ''
  // }
  // notification = new EdToastMessageComponent(this.messageService);
  closeFlag: boolean = false;
  // private compMap = {
  //   InstituteAddComponent: InstituteAddComponent,
  //   AuditoriumAddComponent: AuditoriumAddComponent,
  //   SupplierAddComponent: SupplierAddComponent,
  //   SearchPageComponent: SearchPageComponent
  // }

  // constructor(private fb: FormBuilder, private sharedService: SharedService,
  //   private stylingService: StylingService,
  //   private generalService: GeneralService,
  //   private router: Router,
  //   private dialogService: DialogService,
  //   private componentFactoryResolver: ComponentFactoryResolver,
  //   private messageService: MessageService,) { }

  ngOnInit() {
    this.closeFlag = false
    this.getFavoritePages();
    this.createForm();
    this.createFormData();

  }
  createForm() {
    // this.favoritePagesForm = this.fb.group({
    //   page_id: null,
    //   pagesControl: null
    // })
  }

  createFormData() {
    // this.favoritePagesForm.patchValue({
    //   page_id: this.generalService.currentPage.page_name ? this.generalService.currentPage.page_name : null,
    // })
  }

  changeState() {
    this.closeFlag = false;
    this.createFormData();
  }

  // getFavoritePages() {
  //   // this.pagesList = this.generalService.pagesList;
  //   this.generalService.getFavoritePages().subscribe(pages_data => {
  //     this.pagesList = pages_data;
  //   }, error => {
  //     console.log("תקלה בשליפת דפים מועדפים")
  //   })
  // }
  getFavoritePages() {
    this.closeFlag = false;
    // this.generalService.getRecentActions(2).subscribe((favoritePage) => {
    //   this.pagesList = favoritePage;
    // }, error => {
    //   this.notification.showError("תקלה בשליפת פעולות אחרונות")
    // })
  }


  // openFavoritePage(page: IRecentAction) {
  //   this.closeFlag = true;
  //   var currenModule = this.sharedService.modules.getValue().filter(m => m.module_rid == page.module_id)[0];
  //   if (currenModule) {
  //     this.stylingService.loadTheme(currenModule.css_theme_name);
  //     this.moduleChanged.emit(currenModule);
  //     this.generalService.moduleYear = currenModule.year;
  //   }
  //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //     this.router.navigate([page.router_link], { state: { recentAction: page } });
  //   })

  //   // if (page.router_link) {
  //   //   this.closeFlag = true;
  //   //   this.router.navigate([page.router_link]);
  //   // }
  //   // else if (page.) {
  //   //   let componentFactory: any;
  //   //   componentFactory = this.componentFactoryResolver.resolveComponentFactory((this.compMap as any)[page.component]);
  //   //   const ref = this.dialogService.open(componentFactory.componentType, {
  //   //   })
  //   //   this.closeFlag = true;
  //   // }
  // }

  addPage() {
    // Object.assign(this.page, this.favoritePagesForm.value);
    // if (this.page.page_id) {
    //   this.action = {
    //     action_name: this.favoritePagesForm.controls.page_id.value,
    //     action_type: 2,
    //     router_link: this.generalService.currentPage.router_link,
    //     recent_action_rid: this.generalService.currentPage.page_rid,
    //     module_id: this.generalService.currentPage.module_id,
    //     json_params: this.generalService.currentPage.json_params
    //   }
    //   var item = this.pagesList.find(p => p.router_link == this.action.router_link && p.json_params == this.action.json_params)
    //   if (!item) {
    //     this.generalService.insertFavoritePage(this.action).subscribe(insert_data => {
    //       if (insert_data[0].recent_action_rid) {
    //         this.page.favorite_page_rid = insert_data[0].recent_action_rid;
    //         this.createForm();
    //         this.getFavoritePages();
    //         this.notification.showSuccess('נוסף בהצלחה למועדפים'); 
    //       }
    //       else {
    //         this.notification.showWarn("דף זה קיים ברשימת המועדפים");
    //       }
    //     }, error => {
    //       console.log("תקלה בהכנסה לרשימת מועדפים")
    //     })
    //   }
    //   else{
    //     this.notification.showWarn("דף זה קיים ברשימת המועדפים");
    //   }
    // }
  }

  // deletePage(page: IRecentAction) {
  //   let Leave_title=false;
  //   if(page.action_name==this.generalService.currentPage.page_name){
  //     Leave_title=true;
  //   }
  //   this.generalService.deleteRecentAction(page.recent_action_rid).subscribe(delete_data => {
  //     let index = this.pagesList.findIndex(p => p.recent_action_rid == page.recent_action_rid);
  //     if (index > -1) {
  //       this.pagesList.splice(index, 1);
  //     }
  //   })
  //   this.notification.showSuccess('הוסר בהצלחה מהמעודפים');
  //   if(Leave_title){
  //    this.favoritePagesForm.controls['page_id'].setValue(this.generalService.currentPage.page_name);
  //   }
    
    
  // }

}
