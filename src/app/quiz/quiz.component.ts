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
  title = 'Elixir Quiz';
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
  // quizForm = new FormGroup({
  //   questionOne: new FormControl(''),
  //   questionTwo: new FormControl('')
  // });
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
  submitChoice(response) {
    this.checkAnswer(response);
    this.isAnswered = true;
    if (this.index === this.questions.length - 1) {
      console.log('this quiz is now over');
      this.quizFinished = true;
      this.recordScore(this.userName, this.correct);
      this.router.navigate(['/leaderboard']);
    }
  }

  checkAnswer(choice) {
    const answer = this.answers[this.index - 1].choice;
    if (choice === answer) {
      this.correctAnswer = 'yes';
      this.correct = this.correct + 1;
    } else {
      this.correctAnswer = 'no';
    }
  }

  recordScore(user, score) {
    console.log(`USER: ${user} AND SCORE: ${score}`);
    this.quizService.addScore(user, score);
  }

  // get user name for saving score later
  getUserName() {
    this.userName = localStorage.getItem('user_name');
  }
}
