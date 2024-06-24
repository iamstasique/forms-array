import { FormControl } from '@angular/forms'
import { Country } from '../shared/enum/country'

export type FormCard = {
  country: Country | '',
  userName: string,
  birthday: Date | null,
}

export type ReactiveFormCard = {
  [K in keyof FormCard]: FormControl<FormCard[K]>;
}