import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-new-form-button',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './add-new-form-button.component.html',
  styleUrls: ['./add-new-form-button.component.scss', '../../../styles/form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddNewFormButtonComponent {
  @Input({ required: true }) disabled: boolean = false;
  @Output() onAddForm: EventEmitter<void> = new EventEmitter<void>();

  onAddNewForm(): void {
    this.onAddForm.emit();
  }
}
