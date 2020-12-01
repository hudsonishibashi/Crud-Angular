import { ICanDeactivate } from './candeactivate';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class DeactivateGuard implements CanDeactivate<ICanDeactivate> {
    canDeactivate(
        component: ICanDeactivate,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
        return component.isDisabled();
    }
}