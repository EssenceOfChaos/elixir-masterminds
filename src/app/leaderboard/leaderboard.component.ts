import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LeaderboardService } from './leaderboard.service';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit, AfterViewInit {
  rank = 0;
  displayedColumns = ['rank', 'user', 'score', 'quiz'];
  dataSource;

  @ViewChild(MatSort)
  sort: MatSort;
  constructor(private lb: LeaderboardService) {}

  ngOnInit() {
    this.lb.getScores().subscribe(res => {
      if (res) {
        console.log(res);
        this.dataSource = res;
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
