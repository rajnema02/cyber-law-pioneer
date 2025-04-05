import { Injectable,HostListener  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationGuardService {

  @HostListener('window:beforeunload', ['$event'])
     handleRefresh(event: Event): any {
       // Display a confirmation dialog to the user
       const confirmationMessage = 'Are you sure you want to refresh the page?';

       // Cancel the refresh event if the user chooses to stay on the page
       event.returnValue = true;
       return confirmationMessage;
     }
   }
