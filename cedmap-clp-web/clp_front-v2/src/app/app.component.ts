import { Component } from '@angular/core';
import { ConfirmationGuardService } from './services/confirmation-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'argon-dashboard-angular';
  constructor(private confirmationGuard: ConfirmationGuardService) { }

}
