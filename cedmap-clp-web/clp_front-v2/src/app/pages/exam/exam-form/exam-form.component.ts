import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-exam-form",
  templateUrl: "./exam-form.component.html",
  styleUrls: ["./exam-form.component.scss"],
})
export class ExamFormComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  examData = {
    studentName: "",
    course: "",
    examDate: "",
    questions: ["", "", ""], // Initial three empty questions
  };

  submitExamForm() {
    // Handle form submission logic here
    console.log("Form submitted:", this.examData);
    // You can send the data to a server, perform validations, etc.
  }
}
