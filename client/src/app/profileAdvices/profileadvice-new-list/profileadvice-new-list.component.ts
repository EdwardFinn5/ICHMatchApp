import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileAdvice } from 'src/app/_models/profileAdvice';
import { ProfileadviceService } from 'src/app/_services/profileadvice.service';

@Component({
  selector: 'app-profileadvice-new-list',
  templateUrl: './profileadvice-new-list.component.html',
  styleUrls: ['./profileadvice-new-list.component.css'],
})
export class ProfileadviceNewListComponent implements OnInit {
  @Input() profileAdvices: ProfileAdvice[];
  profileAdviceId: number;

  constructor(
    private profileadviceService: ProfileadviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProfileAdvices();
  }

  loadProfileAdvices() {
    this.profileadviceService
      .getProfileAdvices()
      .subscribe((profileAdvices) => {
        this.profileAdvices = profileAdvices;
      });
  }
}
