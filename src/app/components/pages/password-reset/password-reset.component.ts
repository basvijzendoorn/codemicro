import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  emailFormControl: FormControl = new FormControl('');
  emailSend = false;
  problem = false;

  ngOnInit(): void {
  }

  resetPassword() {
    this.authenticationService.afAuth
      .sendPasswordResetEmail(this.emailFormControl.value)
      .then(() => {
        this.emailSend = true;
      })
      .catch((error) => {
        this.problem = true;
      });
  }

}
