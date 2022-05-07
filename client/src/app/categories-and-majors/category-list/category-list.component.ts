import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/_models/category';
import { MajorService } from 'src/app/_services/major.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  @Input() categories: Category[];
  categoryId: Number;
  @ViewChild('categoryForm') categoryForm: NgForm;
  loading = false;
  category: string;

  constructor(
    private majorService: MajorService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.majorService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  addCategory() {
    // this.loading = true;
    this.majorService
      .addCategory(this.categoryForm.value)
      .subscribe((category) => {
        this.categories.push(category);
        this.toastr.success('Category Added');
        this.categoryForm.reset();
        this.loadCategories();
      });
  }

  deleteCategory(id: number) {
    this.categoryId = id;
    console.log('The next item is categoryId');
    console.log(this.categoryId);
    // this.confirmService
    //   .confirm('Confirm delete message', 'This cannot be undone')
    //   .subscribe((result) => {
    //     if (result) {
    this.majorService.deleteCategory(id).subscribe(() => {
      this.categories.splice(
        this.categories.findIndex((m) => m.categoryId === id),
        1
      );
      this.toastr.success('Category Deleted');
    });
  }

  // editCategory(id: number) {
  //   console.log('the next number is id');
  //   console.log(id);

  //   // this.router.navigate(['/positions/GetPositionById/' + id]);
  //   this.router.navigate(['/positions/GetPositionById/', id]);
  // }
}
