import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { CiempLocation } from 'src/app/_models/ciempLocation';
import { EmpIndustry } from 'src/app/_models/empIndustry';
import { Member } from 'src/app/_models/member';
import { StempLocation } from 'src/app/_models/stempLocation';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CiemplocationService } from 'src/app/_services/ciemplocation.service';
import { EmpindustryService } from 'src/app/_services/empindustry.service';
import { SearchMembersService } from 'src/app/_services/search-members.service';

@Component({
  selector: 'app-empmember-edit-cardnlogo',
  templateUrl: './empmember-edit-cardnlogo.component.html',
  styleUrls: ['./empmember-edit-cardnlogo.component.css'],
})
export class EmpmemberEditCardnlogoComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  member: Member;
  user: User;
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
    private searchMembersService: SearchMembersService,
    private toastr: ToastrService,
    private empIndustryService: EmpindustryService,
    private ciempLocationService: CiemplocationService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.loadMember();
    this.loadEmpIndustries();
    this.loadStempLocations();
    this.loadCiempLocations();
  }

  loadMember() {
    this.searchMembersService
      .getSearchMember(this.user.username)
      .subscribe((member) => {
        this.member = member;
        console.log(member.username);
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
