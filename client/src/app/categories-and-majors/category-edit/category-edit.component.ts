import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/_models/category';
import { MajorService } from 'src/app/_services/major.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css'],
})
export class CategoryEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  category: Category;
  categoryId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private majorService: MajorService
  ) {}

  ngOnInit(): void {
    this.loadCategory();
  }

  loadCategory() {
    this.categoryId = +this.route.snapshot.paramMap.get('categoryId');
    console.log('1st categoryId: ', this.categoryId);
    this.majorService.getCategory(this.categoryId).subscribe((category) => {
      this.category = category;
      console.log('3rd categoryId: ', this.categoryId);
    });
  }

  updateCategory() {
    this.categoryId = +this.route.snapshot.paramMap.get('categoryId');
    console.log('1st categoryId: ', this.categoryId);
    this.majorService
      .updateCategory(this.category, this.categoryId)
      .subscribe(() => {
        this.toastr.success('Category Updated');
        this.editForm.reset(this.category);
        this.router.navigateByUrl('/categorylist');
      });
  }

  cancel() {
    this.router.navigateByUrl('/categorylist');
  }
}
