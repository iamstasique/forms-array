import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BehaviorSubject, Observable, Subject, map, startWith, takeUntil, timer } from 'rxjs';
import { FormsService } from '../../services/forms.service';

@Component({
  selector: 'app-submit-forms-button',
  standalone: true,
  imports: [AsyncPipe, MatButtonModule, MatTooltipModule],
  templateUrl: './submit-forms-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubmitFormsButtonComponent implements OnInit {
  @Input({ required: true }) disabled: boolean = false;
  @Output() onSubmit: EventEmitter<void> = new EventEmitter<void>();

  readonly initialTimerValue: number = 15;

  isTimerActive: boolean = false;
  secondsLeftSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.initialTimerValue);

  submitText$!: Observable<string>;
  tooltipText$!: Observable<string>;

  private timer$!: Observable<number>;
  private cancelTimerSubject: Subject<void> = new Subject<void>();
  private destroyRef: DestroyRef = inject(DestroyRef);
  private formsService: FormsService = inject(FormsService);

  ngOnInit(): void {
    this.submitText$ = this.formsService.formArray.valueChanges.pipe(
      startWith(this.formsService.formArray),
      map(formArray => `Submit ${formArray.length > 1 ? 'all forms' : 'form'}`)
    )

    this.tooltipText$ = this.formsService.formArray.valueChanges.pipe(
      startWith(this.formsService.formArray),
      map(formArray => `Your ${formArray.length > 1 ? 'forms are' : 'form is'} invalid`)
    )
  }

  getResultTimerValue(seconds: number): string {
    return `0:${seconds < 10 ? '0' + seconds : seconds}`;
  }

  submitAllForms(): void {
    this.isTimerActive = true;
    this.formsService.disableAllForms();

    this.timer$ = timer(1000, 1000).pipe(
      map(() => {
        this.secondsLeftSubject.next(this.secondsLeftSubject.value - 1);
        return this.secondsLeftSubject.value;
      }),
      takeUntil(this.cancelTimerSubject),
      takeUntil(timer(this.secondsLeftSubject.value * 1000)),
      takeUntilDestroyed(this.destroyRef)
    )

    this.timer$.subscribe(
      {
        complete: () => {
          if (this.isTimerActive === false) {
            return;
          }

          this.reset();
          this.onSubmit.next();
        }
      })
  }

  reset(): void {
    this.isTimerActive = false;
    this.formsService.enableAllForms();
    this.secondsLeftSubject.next(this.initialTimerValue);
    this.cancelTimerSubject.next();
  }
}
