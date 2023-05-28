import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ChatComponent } from 'src/app/chat/chat.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ChatService } from 'src/app/services/chat.service';

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
  @Input() build: boolean = false;

  constructor(private authenticationService: AuthenticationService,
    private chatService: ChatService) {}

  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 80) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

  inBuildPage() {
    return this.build;
  }

  loggedIn() {
    return this.authenticationService.isLoggedIn;
  }

  logout() {
    return this.authenticationService.SignOut();
  }

  toggleChat() {
    if (!this.chatService.isChatActive()) {
      this.chatService.activateChat();
    } else {
      this.chatService.deactivateChat();
    }
  }

  ngOnInit(): void {}
}
