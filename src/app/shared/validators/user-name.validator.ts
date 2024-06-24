import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, catchError, debounceTime, map, of, startWith, switchMap, take } from 'rxjs';
import { UserService } from '../../services/user.service';

export function userNameValidator(
  service: UserService,
  delay: number = 100,
): AsyncValidatorFn {
  return (
    control: AbstractControl<string>
  ): Observable<ValidationErrors | null> => control.valueChanges.pipe(
    startWith(control.value),
    debounceTime(delay),
    take(1),
    switchMap(value => service.checkUserName(value)),
    map((result: boolean) => result ? null : { invalidUserName: true }),
    catchError(() => of({ invalidUserName: true }))
  )
}