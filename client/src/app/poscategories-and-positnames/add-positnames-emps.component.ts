import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PosCategory } from '../_models/posCategory';
import { PositName } from '../_models/positName';
import { PositNameService } from '../_services/positname.service';

@Component({
  selector: 'app-add-positnames-emps',
  templateUrl: './add-positnames-emps.component.html',
  styleUrls: ['./add-positnames-emps.component.css'],
})
export class AddPositnamesEmpsComponent implements OnInit {
  @Input() positNames: PositName[];
  positNameId: number;
  posCategoryId: number;
  posCategory: PosCategory;
  @ViewChild('positNameForm') positNameForm: NgForm;

  constructor(
    private router: Router,
    private positNameService: PositNameService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.posCategoryId = +this.route.snapshot.paramMap.get('posCategoryId');
    console.log('posCategoryId', this.posCategoryId);
    this.loadPosCategory();
    this.loadPositNames();
  }

  loadPosCategory() {
    this.posCategoryId = +this.route.snapshot.paramMap.get('posCategoryId');
    this.positNameService
      .getPosCategory(this.posCategoryId)
      .subscribe((posCategory) => {
        this.posCategory = posCategory;
      });
  }

  loadPositNames() {
    this.positNameService
      .getPositnamesByPosCategoryId(this.posCategoryId)
      .subscribe((positNames) => {
        this.positNames = positNames;
      });
  }

  addPositName() {
    this.positNameService
      .addPositName(this.positNameForm.value, this.posCategoryId)
      .subscribe((positName) => {
        this.positNames.push(positName);
        this.toastr.success('Position Added');
        this.positNameForm.reset();
        this.loadPositNames();
      });
  }
}
