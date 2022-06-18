import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PosCategory } from '../_models/posCategory';
import { PositNameService } from '../_services/positname.service';

@Component({
  selector: 'app-poscategories-list-emps',
  templateUrl: './poscategories-list-emps.component.html',
  styleUrls: ['./poscategories-list-emps.component.css'],
})
export class PoscategoriesListEmpsComponent implements OnInit {
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
}
