import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SortDirection } from '@angular/material/sort';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root',
  })
  export class RestApiService {

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

    getEvents(sort: string, order: SortDirection, page: number): Observable<any> {
        return this.http
        .get(this.apiURL + 'signatures/events.php?sort='+sort+'&order='+order+'&page='+page)
        .pipe(retry(1), catchError(this.handleError));
    }

    getGorems(event: string): Observable<any> {
      return this.http
      .get(this.apiURL + 'signatures/event.php?event='+event)
      .pipe(retry(1), catchError(this.handleError));
    }
    
    getEvent(event: string, gorem: string): Observable<any> {
      return this.http
      .get(this.apiURL + 'signatures/event.php?event='+event+'&gorem='+gorem)
      .pipe(retry(1), catchError(this.handleError));
    }

    getUsers(gorem: string): Observable<any> {
      return this.http
      .get(this.apiURL + 'signatures/details.php?gorem='+gorem)
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