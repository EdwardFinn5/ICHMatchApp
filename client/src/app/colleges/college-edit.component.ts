import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { College } from '../_models/college';
import { CollegeService } from '../_services/college.service';

@Component({
  selector: 'app-college-edit',
  templateUrl: './college-edit.component.html',
  styleUrls: ['./college-edit.component.css'],
})
export class CollegeEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  college: College;
  collegeId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private collegeService: CollegeService
  ) {}

  ngOnInit(): void {
    this.loadCollege();
  }

  loadCollege() {
    this.collegeId = +this.route.snapshot.paramMap.get('collegeId');
    console.log('1st collegeId: ', this.collegeId);
    this.collegeService.getCollege(this.collegeId).subscribe((college) => {
      this.college = college;
      console.log('3rd collegeId: ', this.collegeId);
    });
  }

  updateCollege() {
    this.collegeId = +this.route.snapshot.paramMap.get('collegeId');
    this.collegeService
      .updateCollege(this.college, this.collegeId)
      .subscribe(() => {
        this.toastr.success('College Updated');
        this.editForm.reset(this.college);
        this.router.navigateByUrl('/collegelist');
      });
  }

  cancel() {
    this.router.navigateByUrl('/collegelist');
  }
}
