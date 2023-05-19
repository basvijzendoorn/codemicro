import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  getEmail(){
    return this.authenticationService.userData.email
  }

  resendEmail() {
    this.authenticationService.SendVerificationMail();
  }

}
