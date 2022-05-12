import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PosCategory } from 'src/app/_models/posCategory';
import { PositNameService } from 'src/app/_services/positname.service';

@Component({
  selector: 'app-poscategory-list',
  templateUrl: './poscategory-list.component.html',
  styleUrls: ['./poscategory-list.component.css'],
})
export class PoscategoryListComponent implements OnInit {
  @Input() posCategories: PosCategory[];
  posCategoryId: number;
  @ViewChild('posCategoryForm') posCategoryForm: NgForm;

  constructor(
    private positNameService: PositNameService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPosCategories();
  }

  loadPosCategories() {
    this.positNameService.getPosCategories().subscribe((posCategories) => {
      this.posCategories = posCategories;
    });
  }

  addPosCategory() {
    this.positNameService
      .addPosCategory(this.posCategoryForm.value)
      .subscribe((posCategory) => {
        this.posCategories.push(posCategory);
        this.toastr.success('PosCategory Added');
        this.posCategoryForm.reset();
        this.loadPosCategories();
      });
  }

  deletePosCategory(id: number) {
    this.posCategoryId = id;
    console.log('The next item is poscategoryId');
    console.log(this.posCategoryId);
    // this.confirmService
    //   .confirm('Confirm delete message', 'This cannot be undone')
    //   .subscribe((result) => {
    //     if (result) {
    this.positNameService.deletePosCategory(id).subscribe(() => {
      this.posCategories.splice(
        this.posCategories.findIndex((m) => m.posCategoryId === id),
        1
      );
      this.toastr.success('PosCategory Deleted');
    });
  }
}
