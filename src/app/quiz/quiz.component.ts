import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';
import { ANSWERS } from './answers';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Validators, FormControl, FormGroup } from '@angular/forms';

interface IQuestion {
  id: number;
  question: string;
  choices: string[];
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  answers = ANSWERS;
  questions: Array<IQuestion>;
  question: Observable<IQuestion>;
  index = 0;
  isAnswered = false;
  quizFinished = false;
  response;
  userName: string;
  // number of correct answers
  correct = 0;
  // state of user's choice ('unanswered', 'no', 'yes')
  correctAnswer = 'unanswered';

  constructor(private quizService: QuizService, public router: Router) {}

  ngOnInit() {
    this.index = 0;
    this.getUserName();
    this.quizService.getQuestions().subscribe(res => {
      if (res) {
        console.log(res);
        this.questions = res.questions;
        this.nextQuestion(this.index);
      }
    });
  }

  nextQuestion(i: number) {
    if (i >= this.questions.length) {
      i = 0;
    }
    this.question = of(this.questions[i]);
    this.index++;
    this.isAnswered = false;
    this.correctAnswer = 'unanswered';
  }

  // get user name for saving score later
  getUserName() {
    this.userName = localStorage.getItem('user_name');
  }
}
