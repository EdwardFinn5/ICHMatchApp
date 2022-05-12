import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Major } from 'src/app/_models/major';
import { MajorService } from 'src/app/_services/major.service';

@Component({
  selector: 'app-major-edit',
  templateUrl: './major-edit.component.html',
  styleUrls: ['./major-edit.component.css'],
})
export class MajorEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  major: Major;
  majorId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private majorService: MajorService
  ) {}

  ngOnInit(): void {
    this.loadMajor();
  }

  loadMajor() {
    this.majorId = +this.route.snapshot.paramMap.get('majorId');
    console.log('1st majorId: ', this.majorId);
    this.majorService.getMajor(this.majorId).subscribe((major) => {
      this.major = major;
      console.log('3rd majorId: ', this.majorId);
    });
  }

  updateMajor() {
    this.majorId = +this.route.snapshot.paramMap.get('majorId');
    console.log('1st majorId: ', this.majorId);
    this.majorService.updateMajor(this.major, this.majorId).subscribe(() => {
      this.toastr.success('Major Updated');
      this.editForm.reset(this.major);
      this.router.navigateByUrl('/addmajors/' + this.major.categoryId);
    });
  }

  cancel() {
    this.router.navigateByUrl('/addmajors/' + this.major.categoryId);
  }
}
