import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { CiempLocation } from '../_models/ciempLocation';
import { Member } from '../_models/member';
import { PosCategory } from '../_models/posCategory';
import { Position } from '../_models/position';
import { PositName } from '../_models/positName';
import { RegisterCode } from '../_models/registerCode';
import { StempLocation } from '../_models/stempLocation';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { CiemplocationService } from '../_services/ciemplocation.service';
import { Position2Service } from '../_services/position2.service';
import { PositNameService } from '../_services/positname.service';
import { RegisterCodeService } from '../_services/register-code.service';
import { SearchMembersService } from '../_services/search-members.service';

@Component({
  selector: 'app-edit-new2-position',
  templateUrl: './edit-new2-position.component.html',
  styleUrls: ['./edit-new2-position.component.css'],
})
export class EditNew2PositionComponent implements OnInit {
  addPositionForm: FormGroup;
  validationErrors: string[] = [];
  stempLocations: StempLocation[];
  ciempLocations: CiempLocation[];
  posCategories: PosCategory[];
  positNames: PositName[];
  position: Position[];
  registerCode: RegisterCode;
  registerCodeId: number = 1;

  // model: any = {};
  // @ViewChild('addPositionForm') addPositionForm: NgForm;
  // position: Position;
  // hrUrl?: string = '';
  // member: Member;
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
    private ciempLocationService: CiemplocationService,
    private positNameService: PositNameService,
    private registerCodeService: RegisterCodeService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    // this.loadMember();
    console.log('User Id: ', this.user.appUserId);
    this.initializeForm();
    this.loadRegisterCode();
    this.loadStempLocations();
    this.loadCiempLocations();
    this.loadPosCategories();
  }

  initializeForm() {
    this.addPositionForm = this.fb.group({
      posCategory: ['', Validators.required],
      registerCode: ['', Validators.required],
      posName: ['', Validators.required],
      positionType: ['', Validators.required],
      ciempLocation: ['', Validators.required],
      stempLocation: ['', Validators.required],
      startDate: ['', Validators.required],
      appDeadline: ['', Validators.required],
    });
  }

  // loadMember() {
  //   this.searchMembersService
  //     .getSearchMember(this.user.username)
  //     .subscribe((member) => {
  //       this.member = member;
  //       console.log('username after loading member: ', member.username);
  //     });
  // }

  loadRegisterCode() {
    this.registerCodeService
      .getRegisterCode(this.registerCodeId)
      .subscribe((registerCode: RegisterCode) => {
        this.registerCode = registerCode;
        console.log(registerCode.registerCodeId);
      });
  }

  addPosition() {
    console.log('form: ', this.addPositionForm.value);
    console.log('id: ', this.user.appUserId);
    this.position2Service
      .addPosition(this.addPositionForm.value, this.user.appUserId)
      .subscribe(
        (response: Position) => {
          this.toastr.success('Required position info added');
          console.log('position ID: ', response.positionId);
          console.log('response: ', response);

          // this.addPositionForm.reset(this.model);
          // this.router.navigateByUrl('empmember/positions');
          this.router.navigateByUrl('/editposition/' + response.positionId);
        },
        (error) => {
          console.log(error);
          this.validationErrors = error;
        }
      );
  }

  loadStempLocations() {
    this.ciempLocationService
      .getStempLocations()
      .subscribe((stempLocations) => {
        this.stempLocations = stempLocations;
      });
  }

  loadCiempLocations() {
    this.ciempLocationService
      .getCiempLocations()
      .subscribe((ciempLocations) => {
        this.ciempLocations = ciempLocations;
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

  loadPosCategories() {
    this.positNameService.getPosCategories().subscribe((posCategories) => {
      this.posCategories = posCategories;
    });
  }

  onPosSelect(posCategories) {
    this.positNameService.getPositNames().subscribe((positNames) => {
      this.positNames = positNames;
      this.positNames = positNames.filter(
        (s) => s.posCategoryId == posCategories.target.value
      );
    });
  }

  cancel() {
    console.log('cancelled');
    this.router.navigateByUrl('/empmember/positions');
  }
}
