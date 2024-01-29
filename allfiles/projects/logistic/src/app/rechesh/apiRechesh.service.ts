import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthGuardService as AuthGuard } from 'core';

@Injectable({
  providedIn: 'root',
})

export class apiRecheshService {
    
    url400: string = "http://jer400:10100/api/";
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    
    constructor(
        private http: HttpClient,
    ){}
    
    getVadaAll(): Observable<any[]> {
        let url: string = this.url400 + 'logistic/vada.php?action=all';
        return this.http.get<any[]>(url);
    }
    
    getVada(id, params): Observable<any[]> {
        let url: string = this.url400 + 'logistic/vada.php?action=vada&id='+id;
        return this.http.get<any[]>(url, {params: params});
    }
    
    getDrisha(id): Observable<any[]> {
        let url: string = this.url400 + 'logistic/vada.php?action=drisha&id='+id;
        return this.http.get<any[]>(url);
    }
    
    postVada(data):Observable<any> {
        return this.http.post(this.url400 + 'logistic/vada_edit.php?action=vada', data, this.httpOptions);
    }
    
    postVadaAction(data):Observable<any> {
        return this.http.post(this.url400 + 'logistic/vada_edit.php?action=vadaActions', data, { responseType: 'text' });
    }
    
    putVada(data):Observable<any> {
        return this.http.put(this.url400 + 'logistic/vada_edit.php?action=vada', data, this.httpOptions);
    }
    
    getYitrotMahsan(ktlg): Observable<any[]> {
        let url: string = this.url400 + 'logistic/vada.php?action=yitrotMahsan&id='+ktlg;
        return this.http.get<any[]>(url);
    }
    
    getKtlgDrishot(ktlg, drisha): Observable<any[]> {
        let url: string = this.url400 + 'logistic/vada.php?action=ktlgDrishot&id='+ktlg+'&drisha='+drisha;
        return this.http.get<any[]>(url);
    }
    
    getDrishaStatus(drisha): Observable<any[]> {
        let url: string = this.url400 + 'logistic/vada.php?action=getDrishaStatus&id='+drisha;
        return this.http.get<any[]>(url);
    }
    
    getHearot(): Observable<any[]> {
        let url: string = this.url400 + 'logistic/vada.php?action=getHearot';
        return this.http.get<any[]>(url);
    }
    
    postDecide(data):Observable<any> {
        return this.http.post(this.url400 + 'logistic/vada_edit.php?action=vadaDecide', data);
    }
    
    postPdfServer(data):Observable<any> {
        return this.http.post(this.url400 + 'logistic/vada_edit.php?action=pdfServer', data);
    }
    
    postPdfSaver(data):Observable<any> {
        return this.http.post(this.url400 + 'logistic/vada_edit.php?action=pdfSaver', data, { responseType: 'blob' });
    }
}
