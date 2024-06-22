import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { FormsListComponent } from '../../components/forms-list/forms-list.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsService } from '../../services/forms.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { first, tap } from 'rxjs';

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

  onSubmit(): void {
    this.formsService.submitAllForms().pipe(
      takeUntilDestroyed(this.destroyRef),
      first(),
    ).subscribe();
  }
}
