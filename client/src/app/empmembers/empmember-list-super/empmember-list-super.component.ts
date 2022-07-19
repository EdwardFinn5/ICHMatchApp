import { Component, OnInit } from '@angular/core';
import { CiempLocation } from 'src/app/_models/ciempLocation';
import { EmpIndustry } from 'src/app/_models/empIndustry';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { StempLocation } from 'src/app/_models/stempLocation';
import { UserParams } from 'src/app/_models/userParams';
import { CiemplocationService } from 'src/app/_services/ciemplocation.service';
import { EmpindustryService } from 'src/app/_services/empindustry.service';
import { SearchMembersService } from 'src/app/_services/search-members.service';

@Component({
  selector: 'app-empmember-list-super',
  templateUrl: './empmember-list-super.component.html',
  styleUrls: ['./empmember-list-super.component.css'],
})
export class EmpmemberListSuperComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
  userParams: UserParams;
  empIndustries: EmpIndustry[];
  ciempLocations: CiempLocation[];
  stempLocations: StempLocation[];

  constructor(
    private searchMemberService: SearchMembersService,
    private empIndustryService: EmpindustryService,
    private ciempLocationService: CiemplocationService
  ) {
    this.userParams = this.searchMemberService.getUserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
    this.loadEmpIndustries();
    this.loadStempLocations();
  }

  loadMembers() {
    this.searchMemberService.setUserParams(this.userParams);
    this.searchMemberService
      .getSearchEmpMembers(this.userParams)
      .subscribe((response) => {
        this.members = response.result;
        this.pagination = response.pagination;
      });
  }

  loadEmpIndustries() {
    this.empIndustryService.getEmpIndustries().subscribe((empIndustries) => {
      this.empIndustries = empIndustries;
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
    this.userParams = this.searchMemberService.resetUserParams();
    this.loadEmpIndustries();
    this.loadStempLocations();
    this.loadMembers();
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.searchMemberService.setUserParams(this.userParams);
    this.loadMembers();
  }
}
