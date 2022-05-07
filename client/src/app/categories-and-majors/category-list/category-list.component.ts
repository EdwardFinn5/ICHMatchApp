import { Component, OnInit } from '@angular/core';
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
  categories: Category[];
  categoryId: Number;

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
    });
  }

  editCategory(id: number) {
    console.log('the next number is id');
    console.log(id);

    // this.router.navigate(['/positions/GetPositionById/' + id]);
    this.router.navigate(['/positions/GetPositionById/', id]);
  }
}
