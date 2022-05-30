import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-home',
  templateUrl: './register-home.component.html',
  styleUrls: ['./register-home.component.css'],
})
export class RegisterHomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onRegisterEmp() {
    this.router.navigate(['/preregisteremp']);
  }

  onRegisterStud() {
    this.router.navigate(['/preregisterstud']);
  }

  cancel() {
    console.log('cancelled');
    this.router.navigateByUrl('/');
  }
}
