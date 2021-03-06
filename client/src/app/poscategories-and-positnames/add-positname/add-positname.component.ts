import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PosCategory } from 'src/app/_models/posCategory';
import { PositName } from 'src/app/_models/positName';
import { PositNameService } from 'src/app/_services/positname.service';

@Component({
  selector: 'app-add-positname',
  templateUrl: './add-positname.component.html',
  styleUrls: ['./add-positname.component.css'],
})
export class AddPositnameComponent implements OnInit {
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

  deletePositName(id: number) {
    this.positNameId = id;
    console.log('The next item is positNameId');
    console.log(this.positNameId);
    // this.confirmService
    //   .confirm('Confirm delete message', 'This cannot be undone')
    //   .subscribe((result) => {
    //     if (result) {
    this.positNameService.deletePositName(id).subscribe(() => {
      this.positNames.splice(
        this.positNames.findIndex((m) => m.positNameId === id),
        1
      );
      this.toastr.success('Position Deleted');
    });
  }
}
