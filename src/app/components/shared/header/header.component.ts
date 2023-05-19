import { Component, OnInit, Input, HostListener } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() dark: boolean = false;
  @Input() sticky: boolean = false;
  @Input() absolute: boolean = false;
  @Input() shadow: boolean = false;

  constructor(private authenticationService: AuthenticationService) {}

  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 80) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

  loggedIn() {
    return this.authenticationService.isLoggedIn;
  }

  ngOnInit(): void {}
}
