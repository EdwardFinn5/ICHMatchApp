import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/_models/category';
import { Major } from 'src/app/_models/major';
import { MajorService } from 'src/app/_services/major.service';

@Component({
  selector: 'app-add-majors-students',
  templateUrl: './add-majors-students.component.html',
  styleUrls: ['./add-majors-students.component.css'],
})
export class AddMajorsStudentsComponent implements OnInit {
  @Input() majors: Major[];
  majorId: number;
  categoryId: number;
  category: Category;
  @ViewChild('majorForm') majorForm: NgForm;

  constructor(
    private router: Router,
    private majorService: MajorService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.categoryId = +this.route.snapshot.paramMap.get('categoryId');
    console.log('categoryId', this.categoryId);
    this.loadCategory();
    this.loadMajors();
  }

  loadCategory() {
    this.categoryId = +this.route.snapshot.paramMap.get('categoryId');
    this.majorService.getCategory(this.categoryId).subscribe((category) => {
      this.category = category;
    });
  }

  loadMajors() {
    this.majorService
      .getMajorsByCategoryId(this.categoryId)
      .subscribe((majors) => {
        this.majors = majors;
      });
  }

  addMajor() {
    this.majorService
      .addMajor(this.majorForm.value, this.categoryId)
      .subscribe((major) => {
        this.majors.push(major);
        this.toastr.success('Major Added');
        this.majorForm.reset();
        this.loadMajors();
      });
  }
}
