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
    this.router.navigate(['/registeremp']);
  }

  onRegisterStud() {
    this.router.navigate(['/registerstud']);
  }
}
