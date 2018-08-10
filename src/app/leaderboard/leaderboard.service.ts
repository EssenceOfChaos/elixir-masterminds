import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  private _url = '/api/scores';
  constructor(private http: HttpClient) {}

  getScores() {
    return this.http.get(this._url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  // General Error Handling Function
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError('Something went wrong; please try again later.');
  }
}
