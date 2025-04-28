import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-landing-about",
  templateUrl: "./landing-about.component.html",
  styleUrls: ["./landing-about.component.scss", "./base.css"],
})
export class LandingAboutComponent implements OnInit {

  usersCount: number = 0;
  clientsCount: number = 0;
  uptimeCount: number = 0;
  expertsCount: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.animateValue('usersCount', 0, 22000, 2000);
    this.animateValue('clientsCount', 0, 150, 2000);
    this.animateValue('uptimeCount', 0, 300, 2000);
    this.animateValue('expertsCount', 0, 20, 2000);
  }

  animateValue(property: string, start: number, end: number, duration: number, isFloat: boolean = false): void {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = isFloat
        ? parseFloat((progress * (end - start) + start).toFixed(2))
        : Math.floor(progress * (end - start) + start);
      (this as any)[property] = value;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
}
