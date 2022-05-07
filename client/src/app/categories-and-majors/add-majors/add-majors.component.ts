import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/_models/category';
import { Major } from 'src/app/_models/major';
import { MajorService } from 'src/app/_services/major.service';

@Component({
  selector: 'app-add-majors',
  templateUrl: './add-majors.component.html',
  styleUrls: ['./add-majors.component.css'],
})
export class AddMajorsComponent implements OnInit {
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
      console.log(category.categoryId);
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

  deleteMajor(id: number) {
    this.majorId = id;
    console.log('The next item is majorId');
    console.log(this.majorId);
    // this.confirmService
    //   .confirm('Confirm delete message', 'This cannot be undone')
    //   .subscribe((result) => {
    //     if (result) {
    this.majorService.deleteMajor(id).subscribe(() => {
      this.majors.splice(
        this.majors.findIndex((m) => m.majorId === id),
        1
      );
      this.toastr.success('Major Deleted');
    });
  }
}
