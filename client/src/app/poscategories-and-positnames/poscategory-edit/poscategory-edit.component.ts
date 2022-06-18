import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PosCategory } from 'src/app/_models/posCategory';
import { PositNameService } from 'src/app/_services/positname.service';

@Component({
  selector: 'app-poscategory-edit',
  templateUrl: './poscategory-edit.component.html',
  styleUrls: ['./poscategory-edit.component.css'],
})
export class PoscategoryEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  posCategory: PosCategory;
  posCategoryId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private positNameService: PositNameService
  ) {}

  ngOnInit(): void {
    this.loadPosCategory();
  }

  loadPosCategory() {
    this.posCategoryId = +this.route.snapshot.paramMap.get('posCategoryId');
    console.log('1st posCategoryId: ', this.posCategoryId);
    this.positNameService
      .getPosCategory(this.posCategoryId)
      .subscribe((posCategory) => {
        this.posCategory = posCategory;
        console.log('3rd posCategoryId: ', this.posCategoryId);
      });
  }

  updatePosCategory() {
    this.posCategoryId = +this.route.snapshot.paramMap.get('posCategoryId');
    console.log('1st posCategoryId: ', this.posCategoryId);
    this.positNameService
      .updatePosCategory(this.posCategory, this.posCategoryId)
      .subscribe(() => {
        this.toastr.success('PosCategory Updated');
        this.editForm.reset(this.posCategory);
        this.router.navigateByUrl('/poscategorylist');
      });
  }

  cancel() {
    this.router.navigateByUrl('/poscategorylist');
  }
}
