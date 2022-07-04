import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpInfo } from '../_models/empInfo';
import { Member } from '../_models/member';
import { EmpinfoService } from '../_services/empinfo.service';
import { SearchMembersService } from '../_services/search-members.service';

@Component({
  selector: 'app-emp-empinfo-edit',
  templateUrl: './emp-empinfo-edit.component.html',
  styleUrls: ['./emp-empinfo-edit.component.css'],
})
export class EmpEmpinfoEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  empInfo: EmpInfo;
  member: Member;
  appUserId: number;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private searchMembersService: SearchMembersService,
    private toastr: ToastrService,
    private empInfoService: EmpinfoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadMember();
    this.loadEmpInfo();
  }

  loadMember() {
    this.appUserId = +this.route.snapshot.paramMap.get('appUserId');
    this.searchMembersService
      .getByIdSearchMember(this.appUserId)
      .subscribe((member) => {
        this.member = member;
      });
  }

  loadEmpInfo() {
    this.empInfoService
      .getEmpInfo(this.appUserId)
      .subscribe((empInfo: EmpInfo) => {
        this.empInfo = empInfo;
        console.log(empInfo.appUserId);
      });
  }

  updateEmpInfo() {
    this.empInfoService
      .updateEmpInfoMember(this.empInfo, this.appUserId)
      .subscribe(() => {
        this.toastr.success('Employer info updated');
        this.editForm.reset(this.empInfo);
      });
  }
}
