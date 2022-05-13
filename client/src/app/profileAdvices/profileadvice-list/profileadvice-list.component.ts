import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileAdvice } from 'src/app/_models/profileAdvice';
import { ProfileadviceService } from 'src/app/_services/profileadvice.service';

@Component({
  selector: 'app-profileadvice-list',
  templateUrl: './profileadvice-list.component.html',
  styleUrls: ['./profileadvice-list.component.css'],
})
export class ProfileadviceListComponent implements OnInit {
  @Input() profileAdvices: ProfileAdvice[];
  profileAdviceId: number;
  @ViewChild('profileAdviceForm') profileAdviceForm: NgForm;

  constructor(
    private profileadviceService: ProfileadviceService,
    private toastr: ToastrService,
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

  addProfileAdvice() {
    this.profileadviceService
      .addProfileAdvice(this.profileAdviceForm.value)
      .subscribe((profileAdvice) => {
        this.profileAdvices.push(profileAdvice);
        this.toastr.success('Profile Advice Added');
        this.profileAdviceForm.reset();
        this.loadProfileAdvices();
      });
  }

  deleteProfileAdvice(id: number) {
    this.profileAdviceId = id;
    console.log('The next item is profile advice Id');
    console.log(this.profileAdviceId);
    // this.confirmService
    //   .confirm('Confirm delete message', 'This cannot be undone')
    //   .subscribe((result) => {
    //     if (result) {
    this.profileadviceService.deleteProfileAdvice(id).subscribe(() => {
      this.profileAdvices.splice(
        this.profileAdvices.findIndex((m) => m.profileAdviceId === id),
        1
      );
      this.toastr.success('Profile advice Deleted');
    });
  }
}
