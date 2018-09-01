import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Quiz } from './quiz';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { environment } from '../../environments/environment';

@Injectable()
export class QuizService {
  // apiUrl = '/assets/quiz.json';
  apiUrl = '/api/scores';
  constructor(private http: HttpClient) {}

  getQuestions(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  addScore(user, score) {
    console.log(`user is ${user} with a score of ${score}`);
    const result = {
      user: user,
      score: score,
    };
    return this.http.post<Quiz>(this.apiUrl, result).pipe(catchError(this.handleError));
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
