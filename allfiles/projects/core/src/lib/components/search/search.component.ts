import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CoreService } from '../../core.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'lib-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
    userData:any;
    initData:any = [];
    searchForm:any = [];
    // @Input() title:any;

    constructor(
        public ref: DynamicDialogRef, 
        public config: DynamicDialogConfig,
        private router: Router,
        private route: ActivatedRoute,
        public restApi: CoreService,
        private cookieService : CookieService,
    ){
        this.initData = config.data;
    }
    
    ngOnInit() {
        this.get_user_filter();
    }
    
    onSubmit(){
        this.router.navigate([], {queryParams: this.searchForm});
    }

    get_user_filter(){
        this.restApi.getUser().subscribe((data: any) => {
            this.userData = data.data;
            if(Object.keys(this.route.snapshot.queryParams).length > 0){
                this.searchForm.filter_fr_gorem = this.searchForm.filter_fr_gorem ? this.searchForm.filter_fr_gorem : this.userData.gorm;
                this.searchForm.filter_to_gorem = this.searchForm.filter_to_gorem ? this.searchForm.filter_to_gorem : this.userData.gorm;
                this.searchForm.filter_fr_drisha = this.searchForm.filter_fr_drisha ? this.searchForm.filter_fr_drisha : 9999;
                this.searchForm.filter_to_drisha = this.searchForm.filter_to_drisha ? this.searchForm.filter_to_drisha : 9999;
                this.searchForm.filter_fr_year = this.searchForm.filter_fr_year ? this.searchForm.filter_fr_year : (new Date()).getFullYear();
                this.searchForm.filter_to_year = this.searchForm.filter_to_year ? this.searchForm.filter_to_year : (new Date()).getFullYear();
                this.searchForm = {...this.route.snapshot.queryParams, ...this.searchForm};
            }else{
                this.searchForm.filter_fr_gorem = this.userData.gorm;
                this.searchForm.filter_to_gorem = this.userData.gorm;
                this.searchForm.filter_fr_drisha = 9999;
                this.searchForm.filter_to_drisha = 9999;
                this.searchForm.filter_fr_year = (new Date()).getFullYear();
                this.searchForm.filter_to_year = (new Date()).getFullYear();
            }
        });
    }
}
