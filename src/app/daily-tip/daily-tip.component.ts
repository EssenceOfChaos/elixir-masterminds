import { Component, OnInit } from '@angular/core';
import { DailyTipService } from './daily-tip.service';

@Component({
  selector: 'app-daily-tip',
  templateUrl: './daily-tip.component.html',
  styleUrls: ['./daily-tip.component.css'],
})
export class DailyTipComponent implements OnInit {
  tips;
  visable = true;
  constructor(private dailyTipService: DailyTipService) {}

  ngOnInit() {
    this.dailyTipService.getTips().subscribe(res => {
      if (res) {
        console.log(res);
        this.tips = res.tips;
      }
    });
  }
  closeTip() {
    // close the daily-tip
    this.visable = false;
  }
}
