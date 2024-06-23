import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first, tap } from 'rxjs';
import { FormsListComponent } from '../../components/forms-list/forms-list.component';
import { FormsService } from '../../services/forms.service';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  imports: [FormsListComponent, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
  private destroyRef: DestroyRef = inject(DestroyRef);
  private formsService: FormsService = inject(FormsService);
  private snackBar: MatSnackBar = inject(MatSnackBar);

  submitAllForms(): void {
    this.formsService.submitAllForms().pipe(
      takeUntilDestroyed(this.destroyRef),
      first(),
      tap((result: boolean) =>
        this.snackBar.open(
          result ? 'Forms submitted successfully' : 'There was an error',
          'OK',
          {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: [result ? 'snackbar-blue' : 'snackbar-red']
          }
        )),
    ).subscribe();
  }
}
