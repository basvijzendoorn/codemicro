import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormControl, Validators } from '@angular/forms';
import { PasswordValidators } from 'src/app/validators/password-validators';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AuthenticationService } from 'src/app/services/authentication.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
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
  termsFormControl = new FormControl('', [Validators.requiredTrue]);
  termsInvalid = false;
  emailInvalid = false;
  submitClicked = false;

  loginMicrosoft() {
    this.authenticationService.MicrosoftAuth();
  }

  loginGoogle() {
    this.authenticationService.GoogleAuth();
  }

  submit() {
    this.submitClicked = true;
    if (!this.emailFieldValid) {
      this.emailInvalid = true;
    } else {
      this.emailInvalid = false;
    }
    if (this.termsFormControl.value !== true) {
      this.termsInvalid = true;
    } else {
      this.termsInvalid = false;
    }

    if (!this.emailInvalid && !this.termsInvalid && this.passwordValid) {
      this.authenticationService.SignUp(this.emailFormControl.value, this.passwordFormControl.value);
      // const auth = getAuth();
      // createUserWithEmailAndPassword(auth, this.emailFormControl.value, this.passwordFormControl.value)
      //   .then((userCredential) => {
      //     // Signed in
      //     const user = userCredential.user;
      //     alert(JSON.stringify(user));
      //     // ...
      //   })
      //   .catch((error) => {
      //     const errorCode = error.code;
      //     const errorMessage = error.message;
      //     // ..
      //   });

    }
  }

  getEmailErrorMessage() {
    if (this.emailFormControl.hasError('required')) {
      return 'Please enter a value.';
    }

    return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.passwordFormControl.hasError('required')) {
      return 'Please enter a value.'
    }

    if (this.passwordFormControl.hasError('minlength')) {
      return 'Minimum 8 character long password.'
    }

    if (this.passwordFormControl.hasError('requiresDigit')) {
      return 'Digit required in password.'
    }
    return '';
  }

  get emailFieldValid() {
    return !this.emailFormControl.hasError("required");
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
