import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class DailyTipService {
  apiUrl = '/assets/tips.json';
  constructor(private http: HttpClient) {}

  getTips(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  // generic error handler
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError('Something went wrong; please try again later.');
  }
}
