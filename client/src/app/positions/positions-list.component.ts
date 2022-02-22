import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { Pagination } from '../_models/pagination';
import { Position } from '../_models/position';
import { UserParams } from '../_models/userParams';
import { Position2Service } from '../_services/position2.service';

@Component({
  selector: 'app-positions-list',
  templateUrl: './positions-list.component.html',
  styleUrls: ['./positions-list.component.css'],
})
export class PositionsListComponent implements OnInit {
  positions: Position[];
  pagination: Pagination;
  userParams: UserParams;
  positionNameList = [
    { value: 'Accounting', display: 'Accounting' },
    { value: 'IT', display: 'IT' },
    { value: 'Marketing', display: 'Marketing' },
  ];
  positionTypeList = [
    { value: 'Internship', display: 'Internships' },
    { value: 'Full-Time', display: 'Full-Time' },
    { value: 'Part-Time', display: 'Part-Time' },
  ];
  positionLocationList = [
    { value: 'Des Moines, IA ', display: 'Des Moines, IA' },
    { value: 'Cedar Rapids, IA', display: 'Cedar Rapids, IA' },
  ];

  constructor(private position2Service: Position2Service) {
    this.userParams = new UserParams();
  }

  ngOnInit(): void {
    this.loadPositions();
  }

  loadPositions() {
    this.position2Service
      .getPositions(this.userParams)
      .subscribe((response) => {
        this.positions = response.result;
        this.pagination = response.pagination;
      });
  }

  resetFilters() {
    this.userParams = new UserParams();
    this.loadPositions();
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.loadPositions();
  }
}
