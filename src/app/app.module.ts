import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
// import services
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { ScopeGuardService } from './auth/scope-guard.service';
import { QuizService } from './quiz/quiz.service';
import { DailyTipService } from './daily-tip/daily-tip.service';
// import material design module
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { QuizComponent } from './quiz/quiz.component';
import { CallbackComponent } from './callback/callback.component';
import { DailyTipComponent } from './daily-tip/daily-tip.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    AdminComponent,
    LeaderboardComponent,
    QuizComponent,
    CallbackComponent,
    DailyTipComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [AuthService, AuthGuardService, ScopeGuardService, QuizService, DailyTipService],
  bootstrap: [AppComponent],
})
export class AppModule {}
