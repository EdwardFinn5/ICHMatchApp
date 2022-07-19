import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CiempLocation } from '../_models/ciempLocation';
import { Member } from '../_models/member';
import { Pagination } from '../_models/pagination';
import { PosCategory } from '../_models/posCategory';
import { Position } from '../_models/position';
import { PositName } from '../_models/positName';
import { StempLocation } from '../_models/stempLocation';
import { UserParams } from '../_models/userParams';
import { CiemplocationService } from '../_services/ciemplocation.service';
import { Position2Service } from '../_services/position2.service';
import { PositNameService } from '../_services/positname.service';
import { SearchMembersService } from '../_services/search-members.service';

@Component({
  selector: 'app-positions-list',
  templateUrl: './positions-list.component.html',
  styleUrls: ['./positions-list.component.css'],
})
export class PositionsListComponent implements OnInit {
  @Output() value: string = '';
  form: NgForm;
  positions: Position[];
  members: Member[];
  pagination: Pagination;
  userParams: UserParams;
  posCategories: PosCategory[];
  positNames: PositName[];
  ciempLocations: CiempLocation[];
  stempLocations: StempLocation[];

  positionTypeList = [
    { value: 'Internship', display: 'Internship' },
    { value: 'Full-Time', display: 'Full-Time' },
    { value: 'Part-Time', display: 'Part-Time' },
  ];

  constructor(
    private position2Service: Position2Service,
    private positNameService: PositNameService,
    private searchMemberService: SearchMembersService,
    private ciempLocationService: CiemplocationService
  ) {
    this.userParams = this.position2Service.getUserParams();
  }

  ngOnInit(): void {
    this.loadPositions();
    this.loadPosCategories();
    this.loadStempLocations();
  }

  loadPosCategories() {
    this.positNameService.getPosCategories().subscribe((posCategories) => {
      this.posCategories = posCategories;
      // console.log(this.categories);
    });
  }

  onPosSelect(posCategories) {
    // console.log(categories.target.value);
    this.positNameService.getPositNames().subscribe((positNames) => {
      this.positNames = positNames;
      // console.log('all majors', majors);
      this.positNames = positNames.filter(
        (e) => e.posCategoryId == posCategories.target.value
      );
      console.log('poscategory id: ', posCategories.target.value);
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

  loadStempLocations() {
    this.ciempLocationService
      .getStempLocations()
      .subscribe((stempLocations) => {
        this.stempLocations = stempLocations;
      });
  }

  onSelect(stempLocations) {
    this.ciempLocationService
      .getCiempLocations()
      .subscribe((ciempLocations) => {
        this.ciempLocations = ciempLocations;
        this.ciempLocations = ciempLocations.filter(
          (e) => e.stempLocationId == stempLocations.target.value
        );
      });
  }

  resetFilters() {
    this.userParams = this.position2Service.resetUserParams();
    this.loadPosCategories();
    this.loadPositions();
    this.loadStempLocations();
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.position2Service.setUserParams(this.userParams);
    this.loadPositions();
  }
}
