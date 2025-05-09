import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreApiService } from 'src/app/services/core-api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-landing-contact',
  templateUrl: './landing-contact.component.html',
  styleUrls: ['./landing-contact.component.scss', './base.css']
})
export class LandingContactComponent implements OnInit {
  showForm: Boolean = true;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  mobile: string = '';
  message: string = '';
  otp: number = 0;
  enteredOtp: number = 0;
  showOtpModal: boolean = false;
  userId: any;

  selectedProgramId: string = '';
  selectedServiceId: string = '';
  selectedServiceDetails: any = null;
  serviceList: any[] = [];

  constructor(private auth: AuthService, private router: Router, private api: CoreApiService) {}

  ngOnInit(): void {
    this.fetchServices();
  }

  fetchServices() {
    this.api.get('service', {}).subscribe({
      next: (res: any) => {
        this.serviceList = res.data || [];
      },
      error: (err) => console.error('Error fetching services:', err)
    });
  }

  onProgramSelect(programId: string) {
    this.selectedProgramId = programId;
    if (programId) {
      this.selectedServiceId = '';
      this.selectedServiceDetails = null;
    }
  }

  onServiceSelect(serviceId: string) {
    this.selectedServiceId = serviceId;
    this.selectedProgramId = '';
    if (serviceId) {
      this.api.getById('service', serviceId).subscribe({
        next: (res: any) => {
          this.selectedServiceDetails = res.data;
        },
        error: (err) => console.error('Error fetching service details:', err)
      });
    } else {
      this.selectedServiceDetails = null;
    }
  }

  regSubmit(frm: NgForm) {
    const f = frm.form;
    if (f.invalid) {
      alert('Please fill all the necessary details');
    } else {
      const formData: any = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        mobile: this.mobile,
        message: this.message,
      };

      if (this.selectedProgramId) {
        formData.program = this.selectedProgramId;
      }
      if (this.selectedServiceId) {
        formData.serviceId = this.selectedServiceId;
      }

      this.api.post('contact', formData).subscribe((resp: any) => {
        if (resp) {
          this.userId = resp._id;
          alert('Created successfully. Please check your OTP.');
          this.showForm = false;
        }
      });
    }
  }

  Submit(frm: NgForm) {
    if (frm.form.invalid) {
      alert('Please fill all the necessary details');
    } else {
      const data = {
        otp: this.otp,
        _id: this.userId
      };
      this.api.post('contact/verify', data).subscribe((resp: any) => {
        if (resp.success) {
          alert('Registered successfully!');
          this.router.navigate(['/home']);
        } else {
          alert('OTP verification failed. Please try again.');
        }
      });
    }
  }
}
