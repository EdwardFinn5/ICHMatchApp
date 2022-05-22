import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/_models/category';
import { MajorService } from 'src/app/_services/major.service';

@Component({
  selector: 'app-category-list-students',
  templateUrl: './category-list-students.component.html',
  styleUrls: ['./category-list-students.component.css'],
})
export class CategoryListStudentsComponent implements OnInit {
  @Input() categories: Category[];
  categoryId: number;
  @ViewChild('categoryForm') categoryForm: NgForm;

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
}
