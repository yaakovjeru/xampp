import { Component } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CoreService } from '../../core.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'lib-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.css'],
})
export class NotesComponent {
    initData:any;
    dataTable: any = [];
    newNote:boolean = false;
    usersList:any[];
    selectedUsers:any[] = [];
    form!: FormGroup;

    constructor(
        public config: DynamicDialogConfig,
        public api: CoreService,
        private messageService: MessageService
    ){
        this.initData = config.data
    }

    ngOnInit() {
        this.setupTableData();
        this.getUsers();
        this.form = new FormGroup({
            users: new FormControl(''),
            remark: new FormControl('')
        });
    }

    setupTableData() {
        this.api.getNotes(this.initData.item.asmx, this.initData.item.assg, this.initData.item.lib, this.initData.item.sug).subscribe(data => {
            this.dataTable = data;
        });
    }

    getUsers(filter = 'all'){
        this.usersList = this.selectedUsers;
        this.api.getUsers(filter).subscribe(data => {
            this.usersList = [...data.data, ...this.selectedUsers];
        });
    }

    searchUsers(event){
        this.getUsers(event);
    }

    selectUser(){
        this.selectedUsers = this.form.value.users;
    }

    postNote(){
        if(!this.form.value.remark || this.form.value.remark == ''){
            this.messageService.add(
                { severity: 'error', summary: 'שגיאה', detail: 'תוכן ההודעה ריק', sticky: false }
            );
            return;
        }
        let body = new FormData();
        body.append('asmx', this.initData.item.asmx);
        body.append('assg', this.initData.item.assg);
        body.append('lib', this.initData.item.lib);
        body.append('sug', this.initData.item.sug);
        body.append('remark', this.form.value.remark);
        for (let index = 0; index < this.form.value.users.length; index++) {
            body.append('users[]', this.form.value.users[index].MSUSER);
        }
        body.append('to_user', this.initData.item.DRFRUS ? this.initData.item.DRFRUS : '');
        if(this.initData.item.assg == 10 || this.initData.item.assg == 11){
            this.api.postNoteVada(body).subscribe(data => {
                this.messageService.add(
                    { severity: 'success', summary: 'תודה רבה', detail: 'ההודעה התקבלה במערכת', sticky: false }
                );
                this.newNote = false;
                this.setupTableData();
            });
        }else{
            this.api.postNote(body).subscribe(data => {
                this.messageService.add(
                    { severity: 'success', summary: 'תודה רבה', detail: 'ההודעה התקבלה במערכת', sticky: false }
                );
                this.newNote = false;
                this.setupTableData();
            });
        }
    }

    rowClick(event){
        // this.openPritim(event);
    }
    
    actionClick(event){
        // if(event.button.label == 'הצגה'){
        //     this.openPritim(event.item);
        // }
    }

}
