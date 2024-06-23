import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormCardComponent } from '../../components/form-card/form-card.component';
import { FormsService } from '../../services/forms.service';
import { ReactiveFormCard } from '../../types/form-card.type';
import { AddNewFormButtonComponent } from "../add-new-form-button/add-new-form-button.component";

@Component({
  selector: 'app-forms-list',
  standalone: true,
  templateUrl: './forms-list.component.html',
  styleUrl: './forms-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormCardComponent, AsyncPipe, AddNewFormButtonComponent]
})
export class FormsListComponent implements OnInit {
  forms!: FormArray<FormGroup<ReactiveFormCard>>;

  private formsService: FormsService = inject(FormsService);
  private snackBar: MatSnackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.getForms();
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
    this.forms = this.formsService.formArray;
  }
}
