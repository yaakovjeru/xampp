import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ragil_apiService {
    // RAGIL
    url400: string = "http://jer400:10100/HNH/YAM_TATEY_SEIFIM_RAGIL.PHP";
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(
        private http: HttpClient
    ){}      
    

    findSEIF(y4: any,hn: any, tur: any): Observable<any> {
        var url: string = this.url400 + '?OP=FIND_SEIF' + "&Y4=" + y4 + "&HN=" + hn + "&TUR=" + tur;  
        return this.http.get<any>(url); 
    }    

    getSEIF_TATIM(y4: any,hn: any): Observable<any> {
        var url: string = this.url400 + '?OP=GET_SEIF_TATIM' + "&Y4=" + y4 + "&HN=" + hn;  
        return this.http.get<any>(url); 
    } 
    
    getFREE_PZL(y4: any): Observable<any> {
        var url: string = this.url400 + '?OP=GET_FREE_PZL' + "&Y4=";  
        return this.http.get<any>(url); 
    }   

    crudROW(y4: any,  tatData: any): Observable<any> {
        var url: string = this.url400 + '?OP=CRUD_ROW' + "&Y4=" + y4;
        return this.http.post<any>(url, JSON.stringify(tatData)); 
    } 
} 
