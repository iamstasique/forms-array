import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, first } from 'rxjs';
import { FormCardComponent } from '../../components/form-card/form-card.component';
import { FormsService } from '../../services/forms.service';
import { FormCard } from '../../types/form-card.type';
import { AddNewFormButtonComponent } from "../add-new-form-button/add-new-form-button.component";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forms-list',
  standalone: true,
  templateUrl: './forms-list.component.html',
  styleUrl: './forms-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormCardComponent, AsyncPipe, AddNewFormButtonComponent]
})
export class FormsListComponent implements OnInit {
  formsList$!: Observable<FormCard[]>;

  private destroyRef: DestroyRef = inject(DestroyRef);
  private formsService: FormsService = inject(FormsService);
  private snackBar: MatSnackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.getForms();
  }

  submitAllForms(): void {
    this.formsService.submitAllForms().pipe(
      takeUntilDestroyed(this.destroyRef),
      first()
    ).subscribe();
  }

  onAddForm(): void {
    const added: boolean = this.formsService.addExtraForm();

    this.snackBar.open(
      added ? 'Form added successfully' : 'You already have 10 forms',
      'OK',
      {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: [added ? 'snackbar-blue' : 'snackbar-red']
      }
    );
  }

  private getForms(): void {
    this.formsList$ = this.formsService.formsList$;
  }
}
