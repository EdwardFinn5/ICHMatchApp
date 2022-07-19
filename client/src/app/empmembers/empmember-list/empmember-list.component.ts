import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CardMember } from 'src/app/_models/cardMember';
import { CiempLocation } from 'src/app/_models/ciempLocation';
import { EmpIndustry } from 'src/app/_models/empIndustry';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { StempLocation } from 'src/app/_models/stempLocation';
import { UserParams } from 'src/app/_models/userParams';
import { CiemplocationService } from 'src/app/_services/ciemplocation.service';
import { EmpindustryService } from 'src/app/_services/empindustry.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-empmember-list',
  templateUrl: './empmember-list.component.html',
  styleUrls: ['./empmember-list.component.css'],
})
export class EmpmemberListComponent implements OnInit {
  cardMembers: CardMember[];
  pagination: Pagination;
  userParams: UserParams;
  empIndustries: EmpIndustry[];
  ciempLocations: CiempLocation[];
  stempLocations: StempLocation[];

  constructor(
    private memberService: MembersService,
    private empIndustryService: EmpindustryService,
    private ciempLocationService: CiemplocationService
  ) {
    this.userParams = this.memberService.getUserParams();
  }

  ngOnInit(): void {
    this.loadCardMembers();
    this.loadEmpIndustries();
    this.loadStempLocations();
  }

  loadCardMembers() {
    this.memberService.setUserParams(this.userParams);
    this.memberService.getEmpMembers(this.userParams).subscribe((response) => {
      this.cardMembers = response.result;
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
    this.userParams = this.memberService.resetUserParams();
    this.loadCardMembers();
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.memberService.setUserParams(this.userParams);
    this.loadCardMembers();
  }
}
