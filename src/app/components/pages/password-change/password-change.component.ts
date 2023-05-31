import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SupabaseService } from 'src/app/services/supabase.service';
import { PasswordValidators } from 'src/app/validators/password-validators';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent {

  constructor(private supabaseService: SupabaseService) {

  }

  submitClicked = false;
  passwordChanged = false;

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    PasswordValidators.patternValidator(new RegExp("(?=.*[0-9])"), {
      requiresDigit: true
    }),
    PasswordValidators.patternValidator(new RegExp("(?=.*[A-Z])"), {
      requiresUppercase: true
    }),
    PasswordValidators.patternValidator(new RegExp("(?=.*[a-z])"), {
      requiresLowercase: true
    })

  ]);

  changePassword() {
    this.submitClicked = true;
    if (this.passwordValid) {
      this.supabaseService.changePassword(this.passwordFormControl.value).then( ({data, error}) => {
        if (error === null) {
          this.passwordChanged = true;
        } else {
          alert(error);
        }
      })
    }
  }


  get passwordValid() {
    return this.passwordFormControl.errors === null;
  }

  get requiredValid() {
    return !this.passwordFormControl.hasError("required");
  }

  get minLengthValid() {
    return !this.passwordFormControl.hasError("minlength");
  }

  get requiresDigitValid() {
    return !this.passwordFormControl.hasError("requiresDigit");
  }

  get requiresUppercaseValid() {
    return !this.passwordFormControl.hasError("requiresUppercase");
  }

  get requiresLowercaseValid() {
    return !this.passwordFormControl.hasError("requiresLowercase");
  }

}
