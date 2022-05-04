import {
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Position } from 'src/app/_models/position';
import { User } from 'src/app/_models/user';
import { Position2Service } from 'src/app/_services/position2.service';

@Component({
  selector: 'app-edit-position',
  templateUrl: './edit-position.component.html',
  styleUrls: ['./edit-position.component.css'],
})
export class EditPositionComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  position: Position;
  user: User;
  positionId: number;

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
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadPosition();
  }

  loadPosition() {
    this.positionId = +this.route.snapshot.paramMap.get('positionId');
    console.log('positionId: ', this.positionId);
    this.position2Service
      .getPositionById(+this.route.snapshot.paramMap.get('positionId'))
      .subscribe((position) => {
        this.position = position;
        console.log('positionId: ', position.positionId);
      });
  }

  updatePosition() {
    this.position2Service
      .updatePosition(this.position, this.position.positionId)
      .subscribe(() => {
        this.toastr.success('Position info updated');
        this.editForm.reset(this.position);
        this.router.navigateByUrl('/empmember/positions');
      });
  }
}
