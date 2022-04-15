import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { Pagination } from '../_models/pagination';
import { PosCategory } from '../_models/posCategory';
import { Position } from '../_models/position';
import { PositName } from '../_models/positName';
import { UserParams } from '../_models/userParams';
import { Position2Service } from '../_services/position2.service';
import { PositNameService } from '../_services/positname.service';

@Component({
  selector: 'app-positions-list',
  templateUrl: './positions-list.component.html',
  styleUrls: ['./positions-list.component.css'],
})
export class PositionsListComponent implements OnInit {
  positions: Position[];
  pagination: Pagination;
  userParams: UserParams;
  posCategories: PosCategory[];
  positNames: PositName[];
  // positionNameList = [
  //   { value: 'Accounting', display: 'Accounting' },
  //   { value: 'IT', display: 'IT' },
  //   { value: 'Marketing', display: 'Marketing' },
  // ];
  positionTypeList = [
    { value: 'Internship', display: 'Internships' },
    { value: 'Full-Time', display: 'Full-Time' },
    { value: 'Part-Time', display: 'Part-Time' },
  ];
  positionLocationList = [
    { value: 'Des Moines, IA ', display: 'Des Moines, IA' },
    { value: 'Cedar Rapids, IA', display: 'Cedar Rapids, IA' },
  ];

  constructor(
    private position2Service: Position2Service,
    private positNameService: PositNameService
  ) {
    this.userParams = this.position2Service.getUserParams();
  }

  ngOnInit(): void {
    this.loadPositions();
    this.loadPosCategories();
  }

  loadPosCategories() {
    this.positNameService.getPosCategories().subscribe((posCategories) => {
      this.posCategories = posCategories;
      // console.log(this.categories);
    });
  }

  // loadPositNames() {
  //   this.positNameService.getPositNames().subscribe((positNames) => {
  //     this.positNames = positNames;
  //     // console.log(this.categories);
  //   });
  // }

  onSelect(posCategories) {
    // console.log(categories.target.value);
    this.positNameService.getPositNames().subscribe((positNames) => {
      this.positNames = positNames;
      // console.log('all majors', majors);
      this.positNames = positNames.filter(
        (e) => e.posCategoryId == posCategories.target.value
      );
      console.log('poscategory id: ', posCategories.target.value);
      // console.log(
      //   'majors with Category Id of ',
      //   categories.target.value,
      //   ': ',
      //   this.majors
      // );
    });
  }

  loadPositions() {
    this.position2Service.setUserParams(this.userParams);
    this.position2Service
      .getPositions(this.userParams)
      .subscribe((response) => {
        this.positions = response.result;
        this.pagination = response.pagination;
      });
  }

  resetFilters() {
    this.userParams = this.position2Service.resetUserParams();
    this.loadPositions();
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.position2Service.setUserParams(this.userParams);
    this.loadPositions();
  }
}
