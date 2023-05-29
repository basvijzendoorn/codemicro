import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  emailFormControl = new FormControl('');
  passwordFormControl = new FormControl('');
  signinInvalid = false;


  ngOnInit(): void {
  }

  login() {
    return this.authenticationService.afAuth
      .signInWithEmailAndPassword(this.emailFormControl.value, this.passwordFormControl.value)
      .then((result) => {
        this.authenticationService.SetUserData(result.user);
        this.authenticationService.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['build']);
          }
        });
      })
      .catch((error) => {
        this.signinInvalid = true;
      });
  }

  loginMicrosoft() {
    return this.authenticationService.MicrosoftAuth();
  }

  loginGoogle(){
    return this.authenticationService.GoogleAuth();
  }

}
