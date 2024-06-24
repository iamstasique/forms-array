import { Injectable, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of, tap } from 'rxjs';
import { FormsRepository } from '../repositories/forms.repository';
import { Country } from '../shared/enum/country';
import { ReactiveFormCard } from '../types/form-card.type';
import { userNameValidator } from '../validators/user-name.validator';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  formArray: FormArray<FormGroup<ReactiveFormCard>> = new FormArray<FormGroup<ReactiveFormCard>>([]);

  private formsRepository: FormsRepository = inject(FormsRepository);
  private userService: UserService = inject(UserService);

  constructor() {
    this.formArray.push(this.getNewForm());
  }

  get isFormArrayInvalid(): boolean {
    return this.formArray.invalid || this.formArray.pending
  }

  addExtraForm(): boolean {
    if (this.formArray.length === 10) {
      return false;
    }

    this.formArray.push(this.getNewForm());
    return true;
  }

  disableAllForms(): void {
    this.formArray.controls.forEach(group => group.disable());
  }

  enableAllForms(): void {
    this.formArray.controls.forEach(group => group.enable());
  }

  submitAllForms(): Observable<boolean> {
    if (this.formArray.length === 0) {
      return of(false);
    }

    return this.formsRepository.submitAllForms(this.formArray.getRawValue()).pipe(
      tap((result: boolean) => {
        if (result) {
          this.formArray.clear();
          this.formArray.push(this.getNewForm());
        }
      })
    );
  }

  private getNewForm(): FormGroup<ReactiveFormCard> {
    return new FormGroup<ReactiveFormCard>({
      country: new FormControl<Country | ''>(
        '',
        {
          nonNullable: true,
          validators: [Validators.required]
        },
      ),
      userName: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
        asyncValidators: [userNameValidator(this.userService, 1500)]
      }),
      birthday: new FormControl<Date | null>(null, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    })
  }
}
