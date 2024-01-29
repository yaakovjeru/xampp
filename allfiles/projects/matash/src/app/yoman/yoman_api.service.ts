import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class yoman_apiService {
    // YOMAN
    url400: string = "http://jer400:10100/HNH/PY_YAM_CASPI_AS400.PHP";
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(
        private http: HttpClient
    ){} 
    
    getTBL_DIC(code: any): Observable<any[]> {    
        var url: string = this.url400 + '?OP=GET_TBL_DIC' + "&CODE=" + code;    
        return this.http.get<any[]>(url); 
    }

    imp400(y4: any, py: any): Observable<any[]> {   
        var url: string = this.url400 + '?OP=GET_PY' + "&Y4=" + y4 + "&PKDA=" + py;      
        return this.http.get<any>(url); 
    }   

    postEXL(y4: any, py: any, oPy400: any[]): Observable<any> {
        var url: string = this.url400 + '?OP=POST_EXL' + "&Y4=" + y4 + "&PKDA=" + py;    
        return this.http.post<any[]>(url, JSON.stringify(oPy400)); 
    }  

    cpyPY(y4: any, py: any, y4NEW: any, pyNEW: any): Observable<any[]> {    
        var url: string = this.url400 + '?OP=CPY_PY' + "&Y4=" + y4 + "&PKDA=" + py + "&NWY4=" + y4NEW + "&NWPK=" + pyNEW;    
        return this.http.get<any[]>(url); 
    } 

    newEMPY_ROW(y4: any, py: any, ln: any, hz: any): Observable<any[]> {    
        var url: string = this.url400 + '?OP=EMPTY_ROW'+ "&Y4=" + y4 + "&PKDA=" + py+ "&LN=" + ln + "&HZ=" + hz;    
        return this.http.get<any[]>(url); 
    } 

    crudROW(y4: any, py: any, oPy400: any): Observable<any> {
        var url: string = this.url400 + '?OP=CRUD_ROW' + "&Y4=" + y4 + "&PKDA=" + py;
        return this.http.post<any>(url, JSON.stringify(oPy400)); 
    } 
    
    getPY_HDRS(y4: any): Observable<any[]> {    
        var url: string = this.url400 + '?OP=GET_HDRS' + "&Y4=" + y4;    
        return this.http.get<any[]>(url); 
    }  

    isrPY(y4: any, py: any): Observable<any[]> {  
        var url: string = this.url400 + '?OP=ISR_PY' + "&Y4=" + y4 + "&PKDA=" + py;
        return this.http.get<any[]>(url); 
    }

    getHN(y4: any,hn: any, tur:any, findBY: any): Observable<any[]> {
        var url: string = this.url400 + '?OP=GET_HN_LIST' + "&Y4=" + y4 + "&PKDA=000000" + "&HN=" + hn + "&TUR=" + tur.trim() + "&BY=" + findBY;  
        return this.http.get<any[]>(url); 
    }

    getPZL(y4: any,hn: any): Observable<any[]> {
        var url: string = this.url400 + '?OP=GET_PZL_LIST' + "&Y4=" + y4 + "&HN=" + hn;  
        return this.http.get<any[]>(url); 
    }

    getTN_HNH(y4: any,hn: any, tur:any, pk: any): Observable<any> {
        var url: string = this.url400 + '?OP=GET_HNH_TN' + "&Y4=" + y4 + "&HN=" + hn + "&TUR=" + tur.trim() + "&PKDA=" + pk;               
        return this.http.get<any>(url);
    }
    
    chkPY_EXIST(y4: any, py: any): Observable<any> {    
        var url: string = this.url400 + '?OP=CHK_PY_EXIST' + "&Y4=" + y4 + "&PKDA=" + py;     
        return  this.http.get<any>(url); 
    }

    addPY_HDR(y4: any, py: any, ymd: any): Observable<any> {    
        var url: string = this.url400 + '?OP=ADD_PY_HDR' + "&Y4=" + y4 + "&PKDA=" + py + "&YMD=" + ymd;     
        return this.http.get<any>(url); 
    }

    delPKUDA(y4: any, py: any): Observable<any> {    
        var url: string = this.url400 + '?OP=DEL_PKUDA' + "&Y4=" + y4 + "&PKDA=" + py;    
        return this.http.get<any>(url); 
    }

    getUSR_PKUDA_FREE(y4: any): Observable<any> {    
        var url: string = this.url400 + '?OP=GET_USR_PKUDA_FREE' + "&Y4=" + y4;  
        return this.http.get<any>(url);
    }
} 
