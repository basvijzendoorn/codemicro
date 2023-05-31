import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private supabaseService: SupabaseService) { }

  emailFormControl = new FormControl('');
  passwordFormControl = new FormControl('');
  signinInvalid = false;


  ngOnInit(): void {
  }

  async login() {
    const { data, error } = await this.supabaseService.signIn(this.emailFormControl.value, this.passwordFormControl.value);
    if (error === null) {
      this.supabaseService.currentSession = data.session;
      this.router.navigate(['build']);
    } else {
      this.signinInvalid = true;
      // alert(error?.message);
    }

    // return this.authenticationService.afAuth
    //   .signInWithEmailAndPassword(this.emailFormControl.value, this.passwordFormControl.value)
    //   .then((result) => {
    //     this.authenticationService.SetUserData(result.user);
    //     this.authenticationService.afAuth.authState.subscribe((user) => {
    //       if (user) {
    //         this.router.navigate(['build']);
    //       }
    //     });
    //   })
    //   .catch((error) => {
    //     this.signinInvalid = true;
    //   });
  }

  loginMicrosoft() {
    this.supabaseService.signInWithAzure();
    // return this.authenticationService.MicrosoftAuth();
  }

  loginGoogle(){
    this.supabaseService.signInWithGoogle();
    // return this.authenticationService.GoogleAuth();
  }

}
