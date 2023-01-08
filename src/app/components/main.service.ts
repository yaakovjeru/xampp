import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SortDirection } from '@angular/material/sort';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
  })
  export class MainApiService {

    private apiURL = environment.API_URL;
    constructor(
        private http: HttpClient,
        private router: Router,
    ) {}
    
    // Http Options
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    getUser(): Observable<any> {
      return this.http
      .get(this.apiURL + 'general/user.php')
      .pipe(retry(1), catchError(this.handleError));
    }

    handleError(error: any) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      //window.alert(errorMessage);
      //console.log(error.status);
      if(error.status == 403){
        document.location.href = 'http://jer400:10100/caspi';
      }
      return throwError(() => {
        return errorMessage;
      });
    }
  }