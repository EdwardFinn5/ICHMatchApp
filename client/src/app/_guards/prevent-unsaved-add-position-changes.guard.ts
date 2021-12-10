import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AddPositionComponent } from '../positions/add-position/add-position.component';

@Injectable({
  providedIn: 'root',
})
export class PreventUnsavedAddPositionChangesGuard
  implements CanDeactivate<unknown>
{
  canDeactivate(component: AddPositionComponent): boolean {
    if (component.addPositionForm.dirty) {
      return confirm(
        'Are you sure you want to continue? Any unsaved changes will be lost'
      );
    }
    return true;
  }
}
