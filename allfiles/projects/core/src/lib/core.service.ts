import { Injectable, isDevMode, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const base_url = isDevMode() ? "http://jer400:10100/yam" : "http://jer400:10100/yam";

@Injectable({
  providedIn: 'root'
})
export class CoreService {

    cookieService=inject(CookieService);
    private apiURL = isDevMode() ? "http://jer400:10100/api/" : "http://jer400:10100/api/"; //environment.API_URL;
    constructor(
        private http: HttpClient,
    ) {}
    
    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
  
    getUser(): Observable<any> {
        this.cookieService.set('logout_point', window.location.href, 10, '/');
        return this.http.get(this.apiURL + 'general/user.php').pipe(retry(1), catchError(this.handleError));
    }
  
    getMenu(): Observable<any> {
        return this.http.get(this.apiURL + 'general/menu.php').pipe(retry(1), catchError(this.handleError));
    }

    logout(){
        return this.http.get(this.apiURL + 'general/logout.php').pipe(retry(1), catchError(this.handleError));
    }

    getNotes(asmx, assg, lib, sug): Observable<any> {
        return this.http.get(this.apiURL + 'general/general.php?action=notes&asmx='+asmx+'&assg='+assg+'&lib='+lib+'&sug='+sug).pipe(retry(1), catchError(this.handleError));
    }

    getDrsSignatures(drs, sug): Observable<any> {
        return this.http.get(this.apiURL + 'logistic/vada.php?action=getDrsSignatures&drs='+drs+'&sug='+sug).pipe(retry(1), catchError(this.handleError));
    }

    getVadSignatures(drs, sug): Observable<any> {
        return this.http.get(this.apiURL + 'logistic/vada.php?action=getVadSignatures&drs='+drs+'&sug='+sug).pipe(retry(1), catchError(this.handleError));
    }

    postNote(data):Observable<any> {
        return this.http.post('http://jer400:10100/caspi/!modules/modul_drs_messages_save_remark.php', data, { responseType: 'text' });
    }

    postNoteVada(data):Observable<any> {
        return this.http.post('http://jer400:10100/caspi/!modules/modul_vad_messages_save_remark.php', data, { responseType: 'text' });
    }

    getUsers(filter): Observable<any> {
        return this.http.get(this.apiURL + 'general/general.php?action=users&filter='+filter).pipe(retry(1), catchError(this.handleError));
    }

    openArchive(id:any, tik:string, desc:string){
        window.open("http://jerarchiveviewer/ArchiveInputDocs.html?SystemId=99&archiveid="+id+"&outside=true&tiknum="+tik+"&description="+desc, '_blank');
    }
  
    handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        if(error.status == 403){
            document.location.href = base_url;
        }
        return throwError(() => {
            return errorMessage;
        });
    }
}
