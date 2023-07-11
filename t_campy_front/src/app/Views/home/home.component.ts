import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/dashboard']);
    }

    this.snackBar.open('Welcome to our forum', 'Close', {
      duration: 3000,
    });
  }
}
