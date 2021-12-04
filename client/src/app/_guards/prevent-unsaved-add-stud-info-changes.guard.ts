import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AddStudInfoComponent } from '../studinfos/add-stud-info/add-stud-info.component';

@Injectable({
  providedIn: 'root',
})
export class PreventUnsavedAddStudInfoChangesGuard
  implements CanDeactivate<unknown>
{
  canDeactivate(component: AddStudInfoComponent): boolean {
    if (component.addStudInfoForm.dirty) {
      return confirm(
        'Are you sure you want to continue? Any unsaved changes will be lost'
      );
    }
    return true;
  }
}
