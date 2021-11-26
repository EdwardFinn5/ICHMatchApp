import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { EmpmemberEditCardnlogoComponent } from '../empmembers/empmember-edit-cardnlogo/empmember-edit-cardnlogo.component';

@Injectable({
  providedIn: 'root',
})
export class PreventUnsavedEmpmemberCardChangesGuard
  implements CanDeactivate<unknown>
{
  canDeactivate(component: EmpmemberEditCardnlogoComponent): boolean {
    if (component.editForm.dirty) {
      return confirm(
        'Are you sure you want to continue? Any unsaved changes will be lost'
      );
    }
    return true;
  }
}
