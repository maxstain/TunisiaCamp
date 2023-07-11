import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private authService: AuthService) {}

  public isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
