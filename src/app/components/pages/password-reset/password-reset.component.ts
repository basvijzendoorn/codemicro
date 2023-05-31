import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  constructor(private supabaseService: SupabaseService) { }

  emailFormControl: FormControl = new FormControl('');
  emailSend = false;
  problem = false;

  ngOnInit(): void {
    this.supabaseService.supabase.auth.getSession().then( ({data, error}) => {
    })
  }

  resetPassword() {
    this.supabaseService.forgotPassword(this.emailFormControl.value)
      .then(( {data, error }) => {
        if (error === null) {
          this.emailSend = true;
        } else {
          this.problem = true;
        }
      })

    // this.authenticationService.afAuth
    //   .sendPasswordResetEmail(this.emailFormControl.value)
    //   .then(() => {
    //     this.emailSend = true;
    //   })
    //   .catch((error) => {
    //     this.problem = true;
    //   });
  }

}
