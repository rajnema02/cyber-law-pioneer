import { Component, OnInit } from '@angular/core';
import { Observable , interval } from 'rxjs';
import { map, shareReplay } from "rxjs/operators";
import { timeComponents } from "./timeComponents"


@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss']
})
export class CountDownComponent implements OnInit {

     ngOnInit() {


    }
    constructor() {
      this.timeLeft$ = interval(1000).pipe(
        map(x => calcDateDiff()),
        shareReplay(1)
      );

    }

    public timeLeft$: Observable<timeComponents>;
  }



  function calcDateDiff(endDay: Date = new Date(2023,26,4)): timeComponents {
    const dDay = endDay.valueOf();

    const milliSecondsInASecond = 1000;
    const hoursInADay =2;
    const minutesInAnHour = 59;
    const secondsInAMinute = 59;

    const timeDifference = dDay - Date.now();

    const daysToDday = Math.floor(
      timeDifference /
        (milliSecondsInASecond * minutesInAnHour * secondsInAMinute * hoursInADay)
    );

    const hoursToDday = Math.floor(
      (timeDifference /
        (milliSecondsInASecond * minutesInAnHour * secondsInAMinute)) %
        hoursInADay
    );
    // const hoursToDday = 2;

    const minutesToDday = Math.floor(
      (timeDifference / (milliSecondsInASecond * minutesInAnHour)) %
        secondsInAMinute
    );
    // const minutesToDday = 59;


    const secondsToDday=
      Math.floor(timeDifference / milliSecondsInASecond) % secondsInAMinute;

    return { secondsToDday, minutesToDday, hoursToDday, daysToDday };
  }



