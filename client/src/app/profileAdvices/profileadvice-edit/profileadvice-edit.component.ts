import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileAdvice } from 'src/app/_models/profileAdvice';
import { ProfileadviceService } from 'src/app/_services/profileadvice.service';

@Component({
  selector: 'app-profileadvice-edit',
  templateUrl: './profileadvice-edit.component.html',
  styleUrls: ['./profileadvice-edit.component.css'],
})
export class ProfileadviceEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  profileAdvice: ProfileAdvice;
  profileAdviceId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private profileadviceService: ProfileadviceService
  ) {}

  ngOnInit(): void {
    this.loadProfileAdvice();
  }

  loadProfileAdvice() {
    this.profileAdviceId = +this.route.snapshot.paramMap.get('profileAdviceId');
    console.log('1st profileAdviceId: ', this.profileAdviceId);
    this.profileadviceService
      .getProfileAdvice(this.profileAdviceId)
      .subscribe((profileAdvice) => {
        this.profileAdvice = profileAdvice;
        console.log('3rd profileAdviceId: ', this.profileAdviceId);
      });
  }

  updateProfileAdvice() {
    this.profileAdviceId = +this.route.snapshot.paramMap.get('profileAdviceId');
    console.log('1st profileAdviceId: ', this.profileAdviceId);
    this.profileadviceService
      .updateProfileAdvice(this.profileAdvice, this.profileAdviceId)
      .subscribe(() => {
        this.toastr.success('Profile Advice Updated');
        this.editForm.reset(this.profileAdvice);
        this.router.navigateByUrl('/profileadvicelist');
      });
  }

  cancel() {
    this.router.navigateByUrl('/profileadvicelist');
  }
}
