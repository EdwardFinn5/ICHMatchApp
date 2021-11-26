import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MemberEditStudinfoComponent } from '../members/member-edit-studinfo/member-edit-studinfo.component';

@Injectable({
  providedIn: 'root',
})
export class PreventUnsavedMemberStudInfoChangesGuard
  implements CanDeactivate<unknown>
{
  canDeactivate(component: MemberEditStudinfoComponent): boolean {
    if (component.editForm.dirty) {
      return confirm(
        'Are you sure you want to continue? Any changes will be lost'
      );
    }
    return true;
  }
}
