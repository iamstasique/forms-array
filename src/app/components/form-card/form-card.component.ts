import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable, map, startWith } from 'rxjs';
import { Country } from '../../shared/enum/country';
import { ReactiveFormCard } from '../../types/form-card.type';
import { ValidationTooltipDirective } from '../../directives/validation-tooltip.directive';

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
    ValidationTooltipDirective
  ],
  templateUrl: './form-card.component.html',
  styleUrl: '../../../styles/form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormCardComponent implements OnInit {
  @Input({ required: true }) formGroup!: FormGroup<ReactiveFormCard>;

  filteredCountriedForSelection$: Observable<Country[]> = new Observable();
  minDate: Date = new Date();

  private countriesForSelection: Country[] = [];

  ngOnInit(): void {
    this.fillCountriesForSelection();
    this.subscribeOnCountryChange();
  }

  onBlurCountry(): void {
    const currentValue = this.formGroup.controls.country.value;
    const isValid = this.countriesForSelection.some(country => country.toLowerCase() === currentValue.toLowerCase());

    if (!isValid) {
      this.formGroup.controls.country.setErrors(['invalid-country']);
      return;
    }

    this.formGroup.controls.country.setErrors(null);
  }

  private fillCountriesForSelection(): void {
    this.countriesForSelection = Object.values(Country);
  }

  private subscribeOnCountryChange(): void {
    this.filteredCountriedForSelection$ = this.formGroup.controls.country.valueChanges.pipe(
      startWith(''),
      map(value => value.toLowerCase().trim()),
      map(value =>
        this.countriesForSelection.filter((country: Country) =>
          country.toLowerCase().includes(value))
      ))
  }
}
