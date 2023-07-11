import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Notification } from 'src/app/Models/Notification/notification';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() public title: string = '';

  hidden: boolean = false;
  notifications: Notification[] = [
    // new Notification(
    //   1,
    //   'You have a new message from user 1',
    //   'message',
    //   new Date()
    // ),
    // new Notification(
    //   2,
    //   'You have a new message from user 2',
    //   'warning',
    //   new Date()
    // ),
  ];

  routerlink: Router;

  constructor(private router: Router, private authService: AuthService) {
    this.routerlink = router;
    if (this.notifications.length == 0) {
      this.hidden = true;
    } else {
      this.hidden = false;
    }
  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  get isLogged(): boolean {
    return this.authService.isLogged();
  }
}
