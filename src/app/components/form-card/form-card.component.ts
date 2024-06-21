import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable, map, startWith } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Country } from '../../shared/enum/country';
import { ReactiveFormCard } from '../../types/form-card.type';
import { userNameValidator } from '../../validators/user-name.validator';

@Component({
  selector: 'app-form-card',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    AsyncPipe,
    MatAutocompleteModule,
  ],
  templateUrl: './form-card.component.html',
  styleUrl: './form-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormCardComponent implements OnInit {
  form!: FormGroup<ReactiveFormCard>;

  filteredCountriedForSelection$: Observable<Country[]> = new Observable();
  minDate: Date = new Date();

  private countriesForSelection: Country[] = [];
  private userService: UserService = inject(UserService);

  ngOnInit(): void {
    this.initForm();
    this.fillCountriesForSelection();
    this.subscribeOnCountryChange();
  }

  onBlurCountry(): void {
    const currentValue = this.form.controls.country.value;
    const isValid = this.countriesForSelection.some(country => country.toLowerCase() === currentValue.toLowerCase());

    if (!isValid) {
      this.form.controls.country.setValue('', { emitEvent: false });
    }
  }

  private initForm(): void {
    this.form = new FormGroup<ReactiveFormCard>({
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
      birthday: new FormControl<Date>(new Date(), {
        nonNullable: true,
        validators: [Validators.required],
      }),
    })
  }

  private fillCountriesForSelection(): void {
    this.countriesForSelection = Object.values(Country);
  }

  private subscribeOnCountryChange(): void {
    this.filteredCountriedForSelection$ = this.form.controls.country.valueChanges.pipe(
      startWith(''),
      map(value => value.toLowerCase().trim()),
      map(value =>
        this.countriesForSelection.filter((country: Country) =>
          country.toLowerCase().includes(value))
      ))
  }
}
