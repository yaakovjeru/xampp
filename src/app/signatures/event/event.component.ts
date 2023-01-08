import {AfterViewInit, Component, ViewChild, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {RestApiService} from '../api.service';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'order', 'code', 'actions'];
  dataSource = new MatTableDataSource();
  public url_id: string;
  public url_gorem: string;
  public goremSelect: string;
  public goremList:any;
  public goremListFilter: [];
  public dataChange: any;
  public errorMessage:string;
  public startEdit:boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    public restApi: RestApiService,
    private readonly title: Title,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(){
    this.url_id = this.route.snapshot.paramMap.get('id');
    this.url_gorem = this.route.snapshot.paramMap.get('gorem');
    this.title.setTitle("סדר חותמים באירוע "+this.url_id);
    if(this.url_gorem){
      this.getEvent();
    }else{
      this.getGorems();
    }
  }

  getGorems(){
    this.restApi.getGorems(this.url_id).subscribe((data: any) => {
      if(data.success){
        this.goremList = data.data;
        this.goremListFilter = data.data;
      }else{
        // this.errorMessage = data.message;
        this.openSnackBar(data.message);
      }
    });
  }

  goEvent(){
    this.router.navigate(['/signatures/event', this.url_id, this.goremSelect]);
  }

  getEvent(){
    this.restApi.getEvent(this.url_id, this.url_gorem).subscribe((data: any) => {
      if(data.success){
        this.dataChange = data.data;
        this.dataSource.data = data.data;
      }else{
        // this.errorMessage = data.message;
        this.openSnackBar(data.message);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goBack(){
    if(this.url_gorem){
      this.router.navigate(['/signatures/event', this.url_id]);
    }else{
      this.router.navigate(['/signatures/events']);
    }
  }

  onKey(value) { 
    this.goremListFilter = this.search(value);
  }
  
  search(value: string) { 
    let filter = value.toLowerCase();
    return this.goremList.filter(option => option['VSGORM'].toLowerCase().startsWith(filter));
  }

  getUsers(tfkd){
    this.restApi.getUsers(tfkd).subscribe((data: any) => {
      const dialogRef = this.dialog.open(EventUsersDialog, {
        width: '620px',
        data: {
          users: data.data
        }
      });

      // dialogRef.afterClosed().subscribe(result => {
      //   console.log(`Dialog result: ${result}`);
      // });

    });
  }

  deleteRow(id){
    let arrindex = this.dataChange.findIndex(x => x['VSTFKD'] == id);
    this.dataChange.splice(arrindex, 1);
    //this.dataChange[arrindex].delete = 1;
    this.dataSource.data = this.dataChange;
    this.startEdit = true;
  }

  SortRow(index, item, position){
    this.startEdit = true;
    // console.log(this.dataChange[index].VSSEHA);
    // console.log(item);
    console.log(this.dataChange[index].VSSEHA);
  
    if(position == 'up'){
      this.dataChange[index].VSSEHA = Number(this.dataChange[index].VSSEHA) - 1;
      this.dataChange[index-1].VSSEHA = Number(this.dataChange[index].VSSEHA) + 1;
    }
    
    if(position == 'down'){
      this.dataChange[index].VSSEHA = Number(this.dataChange[index].VSSEHA) + 1;
      this.dataChange[index+1].VSSEHA = Number(this.dataChange[index].VSSEHA) - 1;
    }

  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'סגירה');
  }

}

@Component({
  selector: 'event-users-dialog',
  templateUrl: 'event-users.html',
})
export class EventUsersDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data) {}
}
