import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-landing-footer",
  templateUrl: "./landing-footer.component.html",
  styleUrls: ["./landing-footer.component.scss", "./base.css"],
})
export class LandingFooterComponent implements OnInit {
  constructor() {}
  currentYear: number = new Date().getFullYear();

  ngOnInit(): void {}
}
