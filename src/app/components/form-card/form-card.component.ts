import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable, map } from 'rxjs';
import { Country } from '../../shared/enum/country';
import { ReactiveFormCard } from '../../types/form-card.type';

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
    MatAutocompleteModule],
  templateUrl: './form-card.component.html',
  styleUrl: './form-card.component.scss'
})
export class FormCardComponent implements OnInit {
  form: FormGroup<ReactiveFormCard> = new FormGroup<ReactiveFormCard>({
    country: new FormControl<Country | ''>('', { nonNullable: true }),
    userName: new FormControl<string>('', { nonNullable: true }),
    birthday: new FormControl<Date>(new Date(), { nonNullable: true }),
  })

  filteredCountriedForSelection$: Observable<Country[]> = new Observable();

  minDate: Date = new Date();

  private countriesForSelection: Country[] = [];

  ngOnInit(): void {
    this.fillCountriesForSelection();
    this.subscribeOnCountryChange();
  }

  private fillCountriesForSelection(): void {
    this.countriesForSelection = Object.values(Country);

  }

  private subscribeOnCountryChange(): void {
    this.filteredCountriedForSelection$ = this.form.controls.country.valueChanges.pipe(
      map(value => value.toLowerCase().trim()),
      map(value =>
        this.countriesForSelection.filter((country: Country) =>
          country.toLowerCase().includes(value))
      ))
  }

}
