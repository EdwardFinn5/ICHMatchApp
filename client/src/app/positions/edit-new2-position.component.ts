import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from '../_models/member';
import { Position } from '../_models/position';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { Position2Service } from '../_services/position2.service';
import { SearchMembersService } from '../_services/search-members.service';

@Component({
  selector: 'app-edit-new2-position',
  templateUrl: './edit-new2-position.component.html',
  styleUrls: ['./edit-new2-position.component.css'],
})
export class EditNew2PositionComponent implements OnInit {
  addPositionForm: FormGroup;
  validationErrors: string[] = [];

  model: any = {};
  // @ViewChild('addPositionForm') addPositionForm: NgForm;
  position: Position;
  hrUrl?: string = '';
  member: Member;
  user: User;
  positionTypeList = [
    { value: 'Internship', display: 'Internship' },
    { value: 'Full-Time', display: 'Full-Time' },
    { value: 'Part-Time', display: 'Part-Time' },
  ];
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.addPositionForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(
    private router: Router,
    private position2Service: Position2Service,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private searchMembersService: SearchMembersService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.loadMember();
    this.initializeForm();
  }

  initializeForm() {
    this.addPositionForm = this.fb.group({
      positionName: ['', Validators.required],
      positionType: [''],
      positionLocation: ['', Validators.required],
      positionDescription: ['', Validators.required],
      positionBenefits: [''],
    });
  }

  loadMember() {
    this.searchMembersService
      .getSearchMember(this.user.username)
      .subscribe((member) => {
        this.member = member;
        console.log('username after loading member: ', member.username);
      });
  }

  addPosition() {
    console.log('form: ', this.addPositionForm.value);
    console.log('id: ', this.user.appUserId);
    this.position2Service
      .addPosition(this.addPositionForm.value, this.user.appUserId)
      .subscribe(() => {
        this.toastr.success('Position info added');

        this.addPositionForm.reset(this.model);
        // this.router.navigateByUrl('empmember/positions');
        this.router.navigateByUrl('/empmember/positions');
      });
  }

  cancel() {
    console.log('cancelled');
    this.router.navigateByUrl('/empmember/positions');
  }
}
