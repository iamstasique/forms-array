import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormCardComponent } from '../../components/form-card/form-card.component';

@Component({
  selector: 'app-forms-list',
  standalone: true,
  imports: [FormCardComponent],
  templateUrl: './forms-list.component.html',
  styleUrl: './forms-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormsListComponent {
}
