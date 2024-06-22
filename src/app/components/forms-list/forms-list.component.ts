import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, first } from 'rxjs';
import { FormCardComponent } from '../../components/form-card/form-card.component';
import { FormsService } from '../../services/forms.service';
import { FormCard } from '../../types/form-card.type';

@Component({
  selector: 'app-forms-list',
  standalone: true,
  imports: [FormCardComponent, AsyncPipe],
  templateUrl: './forms-list.component.html',
  styleUrl: './forms-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormsListComponent implements OnInit {
  formsList$!: Observable<FormCard[]>;

  private destroyRef: DestroyRef = inject(DestroyRef);
  private formsService: FormsService = inject(FormsService);

  ngOnInit(): void {
    this.getForms();
  }

  submitAllForms(): void {
    this.formsService.submitAllForms().pipe(
      takeUntilDestroyed(this.destroyRef),
      first()
    ).subscribe();
  }

  private getForms(): void {
    this.formsList$ = this.formsService.formsList$;
  }
}
