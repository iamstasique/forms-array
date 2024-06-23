import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'
import { FormsService } from '../../services/forms.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-new-form-button',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './add-new-form-button.component.html',
  styleUrls: ['./add-new-form-button.component.scss', '../../../styles/form-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddNewFormButtonComponent {
  private formsService: FormsService = inject(FormsService);
  private snackBar: MatSnackBar = inject(MatSnackBar);

  onAddNewForm(): void {
    const added = this.formsService.addExtraForm();

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
}
