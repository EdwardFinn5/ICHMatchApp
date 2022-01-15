import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { EditPositionComponent } from '../positions/edit-position/edit-position.component';

@Injectable({
  providedIn: 'root',
})
export class PreventUnsavedEditPositionChangesGuard
  implements CanDeactivate<unknown>
{
  canDeactivate(component: EditPositionComponent): boolean {
    if (component.editForm.dirty) {
      return confirm(
        'Are you sure you want to continue? Any changes will be lost'
      );
    }
    return true;
  }
}
