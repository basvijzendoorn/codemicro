import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private supabaseService: SupabaseService) { }

  ngOnInit(): void{
  }

  getEmail(){
    return "";
    //return this.supabaseService.currentSession?.user?.email;    // return this.supabaseService.currentUser?.email;
  }

  resendEmail() {
    //this.supabaseService.resendVerificationEmail(this.supabaseService.currentSession?.user?.email ?? "");

    // this.authenticationService.SendVerificationMail();
  }

}
