import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { College } from '../_models/college';
import { CollegeService } from '../_services/college.service';

@Component({
  selector: 'app-college-list',
  templateUrl: './college-list.component.html',
  styleUrls: ['./college-list.component.css'],
})
export class CollegeListComponent implements OnInit {
  @Input() colleges: College[];
  collegeId: number;
  @ViewChild('collegeForm') collegeForm: NgForm;

  constructor(
    private collegeService: CollegeService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadColleges();
  }

  loadColleges() {
    this.collegeService.getColleges().subscribe((colleges) => {
      this.colleges = colleges;
    });
  }

  addCollege() {
    this.collegeService
      .addCollege(this.collegeForm.value)
      .subscribe((college) => {
        this.colleges.push(college);
        this.toastr.success('College Added');
        this.collegeForm.reset();
        this.loadColleges();
      });
  }

  deleteCollege(id: number) {
    this.collegeId = id;
    // this.confirmService
    //   .confirm('Confirm delete message', 'This cannot be undone')
    //   .subscribe((result) => {
    //     if (result) {
    this.collegeService.deleteCollege(id).subscribe(() => {
      this.colleges.splice(
        this.colleges.findIndex((m) => m.collegeId === id),
        1
      );
      this.toastr.success('College Deleted');
    });
  }
}
