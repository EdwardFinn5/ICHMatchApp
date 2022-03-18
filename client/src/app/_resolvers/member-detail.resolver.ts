import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Member } from '../_models/member';
import { SearchMembersService } from '../_services/search-members.service';

@Injectable({
  providedIn: 'root',
})
export class MemberDetailResolver implements Resolve<Member> {
  constructor(private searchMemberService: SearchMembersService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Member> {
    return this.searchMemberService.getSearchMember(
      route.paramMap.get('username')
    );
  }
}
