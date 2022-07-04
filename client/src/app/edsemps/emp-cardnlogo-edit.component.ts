import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CiempLocation } from '../_models/ciempLocation';
import { EmpIndustry } from '../_models/empIndustry';
import { Member } from '../_models/member';
import { StempLocation } from '../_models/stempLocation';
import { AccountService } from '../_services/account.service';
import { CiemplocationService } from '../_services/ciemplocation.service';
import { EmpindustryService } from '../_services/empindustry.service';
import { SearchMembersService } from '../_services/search-members.service';

@Component({
  selector: 'app-emp-cardnlogo-edit',
  templateUrl: './emp-cardnlogo-edit.component.html',
  styleUrls: ['./emp-cardnlogo-edit.component.css'],
})
export class EmpCardnlogoEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  member: Member;
  appUserId: number;
  empIndustries: EmpIndustry[];
  ciempLocations: CiempLocation[];
  stempLocations: StempLocation[];
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private searchMembersService: SearchMembersService,
    private toastr: ToastrService,
    private empIndustryService: EmpindustryService,
    private ciempLocationService: CiemplocationService
  ) {
    // this.accountService.currentUser$
    //   .pipe(take(1))
    //   .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.loadMember();
    this.loadEmpIndustries();
    this.loadStempLocations();
    this.loadCiempLocations();
  }

  loadMember() {
    this.appUserId = +this.route.snapshot.paramMap.get('appUserId');
    this.searchMembersService
      .getByIdSearchMember(this.appUserId)
      .subscribe((member) => {
        this.member = member;
      });
  }

  updateMemberCard() {
    this.searchMembersService.updateMemberCard(this.member).subscribe(() => {
      console.log(this.member);
      this.toastr.success('Card info updated');
      this.editForm.reset(this.member);
    });
  }

  loadEmpIndustries() {
    this.empIndustryService.getEmpIndustries().subscribe((empIndustries) => {
      this.empIndustries = empIndustries;
    });
  }

  loadCiempLocations() {
    this.ciempLocationService
      .getCiempLocations()
      .subscribe((ciempLocations) => {
        this.ciempLocations = ciempLocations;
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
}
