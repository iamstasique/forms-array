import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FormCard } from '../types/form-card.type';
import { FormsRepository } from '../repositories/forms.repository';

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  formsList$!: Observable<FormCard[]>

  private formsListSubject!: BehaviorSubject<FormCard[]>;
  private formsRepository: FormsRepository = inject(FormsRepository);

  constructor() {
    this.initFormsState();
    this.formsList$ = this.formsListSubject.asObservable();
  }

  addExtraForm(): boolean {
    const existingForms = this.formsListSubject.value;
    if (existingForms.length === 10) {
      return false;
    }

    const form: FormCard = { ...this.getEmptyForm() }
    existingForms.push(form);

    this.formsListSubject.next(existingForms);
    return true;
  }

  private initFormsState(): void {
    const form: FormCard = { ...this.getEmptyForm() }
    this.formsListSubject = new BehaviorSubject<FormCard[]>([form]);
  }

  submitAllForms(): Observable<boolean> {
    if (this.formsListSubject.value.length === 0) {
      return of(false);
    }

    return this.formsRepository.submitAllForms(this.formsListSubject.value);
  }

  private getEmptyForm(): FormCard {
    return {
      country: '',
      userName: '',
      birthday: new Date()
    }
  }
}
