import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { EmpmemberEditCardnlogoComponent } from '../empmembers/empmember-edit-cardnlogo/empmember-edit-cardnlogo.component';
import { MemberEditCardnphotoComponent } from '../members/member-edit-cardnphoto/member-edit-cardnphoto.component';

@Injectable({
  providedIn: 'root',
})
export class PreventUnsavedMemberCardChangesGuard
  implements CanDeactivate<unknown>
{
  canDeactivate(component: MemberEditCardnphotoComponent): boolean {
    if (component.editForm.dirty) {
      return confirm(
        'Are you sure you want to continue? Any unsaved changes will be lost'
      );
    }
    return true;
  }
}
