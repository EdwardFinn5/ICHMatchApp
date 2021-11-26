import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { EmpmemberEditPositionComponent } from '../empmembers/empmember-edit-position/empmember-edit-position.component';

@Injectable({
  providedIn: 'root',
})
export class PreventUnsavedEmpmemberCardPositionChangesGuard
  implements CanDeactivate<unknown>
{
  canDeactivate(component: EmpmemberEditPositionComponent): boolean {
    if (component.editForm.dirty) {
      return confirm(
        'Are you sure you want to continue? Any changes will be lost'
      );
    }
    return true;
  }
}
