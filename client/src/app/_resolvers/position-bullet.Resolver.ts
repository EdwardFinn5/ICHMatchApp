import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Member } from '../_models/member';
import { Position } from '../_models/position';
import { Position2Service } from '../_services/position2.service';
import { SearchMembersService } from '../_services/search-members.service';

@Injectable({
  providedIn: 'root',
})
export class PositionBulletResolver implements Resolve<Position> {
  constructor(private position2Service: Position2Service) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Position> {
    return this.position2Service.getPositionById(
      +route.paramMap.get('positionId')
    );
  }
}
