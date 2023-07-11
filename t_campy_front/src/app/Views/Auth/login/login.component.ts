import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router // private toastr: ToastrService
  ) {
    this.username = '';
    this.password = '';
  }
  /**
   * Login function
   *
   * @memberof LoginComponent
   */
  login(): void {
    this.authService.login(this.username, this.password);
    this.router.navigate(['/']);
  }
}
