import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CiempLocation } from '../_models/ciempLocation';
import { DutyBullet } from '../_models/dutyBullet';
import { PosCategory } from '../_models/posCategory';
import { Position } from '../_models/position';
import { PositName } from '../_models/positName';
import { SkillsBullet } from '../_models/skillsBullet';
import { StempLocation } from '../_models/stempLocation';
import { BulletService } from '../_services/bullet.service';
import { CiemplocationService } from '../_services/ciemplocation.service';
import { Position2Service } from '../_services/position2.service';
import { PositNameService } from '../_services/positname.service';

@Component({
  selector: 'app-eds-position-edit',
  templateUrl: './eds-position-edit.component.html',
  styleUrls: ['./eds-position-edit.component.css'],
})
export class EdsPositionEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  position: Position;
  posName: string;
  positionId: number;
  stempLocations: StempLocation[];
  ciempLocations: CiempLocation[];
  posCategories: PosCategory[];
  positNames: PositName[];
  @Input() dutyBullets: DutyBullet[];
  @Input() skillsBullets: SkillsBullet[];
  dutyBullet: string;
  skillsBullet: string;
  loading = false;
  positionTypeList = [
    { value: 'Internship', display: 'Internship' },
    { value: 'Full-Time', display: 'Full-Time' },
    { value: 'Part-Time', display: 'Part-Time' },
  ];

  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private router: Router,
    private position2Service: Position2Service,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private bulletService: BulletService,
    private ciempLocationService: CiemplocationService,
    private positNameService: PositNameService
  ) {}

  ngOnInit(): void {
    this.loadPosition();
    this.loadStempLocations();
    this.loadPosCategories();
  }

  loadPosition() {
    this.positionId = +this.route.snapshot.paramMap.get('positionId');
    console.log('positionId: ', this.positionId);
    this.position2Service
      .getPositionById(+this.route.snapshot.paramMap.get('positionId'))
      .subscribe((position) => {
        this.position = position;
        console.log('positionId: ', position.positionId);
        this.loadDutyBullets();
        this.loadSkillsBullets();
      });
  }

  loadDutyBullets() {
    this.bulletService
      .getDutyBullets(this.positionId)
      .subscribe((dutyBullets) => {
        this.dutyBullets = dutyBullets;
      });
  }

  loadSkillsBullets() {
    this.bulletService
      .getSkillsBullets(this.positionId)
      .subscribe((skillsBullets) => {
        this.skillsBullets = skillsBullets;
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

  updatePosition() {
    this.position2Service
      .updatePosition(this.position, this.position.positionId)
      .subscribe(() => {
        this.toastr.success('Position info updated');
        this.editForm.reset(this.position);
        // this.router.navigateByUrl('/empmember/positions');
      });
  }

  addDutyBullets() {
    this.router.navigateByUrl(
      '/positiondutybullets/' + this.position.positionId
    );
  }

  addSkillsBullets() {
    this.router.navigateByUrl(
      '/positionskillsbullets/' + this.position.positionId
    );
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
}
