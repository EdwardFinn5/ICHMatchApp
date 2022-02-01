import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { EmpmemberEditEmpinfoComponent } from '../empmembers/empmember-edit-empinfo/empmember-edit-empinfo.component';
import { Empmember2EditEmpinfoComponent } from '../empmembers/empmember2-edit-empinfo.component';

@Injectable({
  providedIn: 'root',
})
export class PreventUnsavedEmpmemberCardEmpInfoChangesGuard
  implements CanDeactivate<unknown>
{
  canDeactivate(component: Empmember2EditEmpinfoComponent): boolean {
    if (component.editForm.dirty) {
      return confirm(
        'Are you sure you want to continue? Any changes will be lost'
      );
    }
    return true;
  }
}
