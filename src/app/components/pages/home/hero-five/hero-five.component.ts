import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-hero-five',
  templateUrl: './hero-five.component.html',
  styleUrls: ['./hero-five.component.css']
})
export class HeroFiveComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  loggedIn() {
    return this.authenticationService.isLoggedIn;
  }

  ngOnInit(): void {
  }

}
