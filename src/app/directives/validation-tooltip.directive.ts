import { DestroyRef, Directive, ElementRef, Input, OnInit, Renderer2, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgControl } from '@angular/forms';
import { tap } from 'rxjs';

@Directive({
  selector: '[appValidationTooltip]',
  standalone: true
})
export class ValidationTooltipDirective implements OnInit {
  @Input({ required: true }) fieldForValidation!: 'country' | 'userName' | 'birthday'

  private renderer: Renderer2 = inject(Renderer2);
  private el: ElementRef = inject(ElementRef);

  private ngControl: NgControl = inject(NgControl);
  private errorMessage: string = '';
  private destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.setErrorMessage();
    this.subscribeOnStatusChanges();
  }

  private setErrorMessage(): void {
    const normalizedFieldsNames = {
      country: 'country',
      userName: 'user name',
      birthday: 'birthday'
    };

    this.errorMessage = `Please provide a correct ${normalizedFieldsNames[this.fieldForValidation]}`;
  }

  private handleErrors(status: string): void {
    const parentElement = this.el.nativeElement.closest('mat-form-field');
    const validationErrorClass = 'with-error';

    this.removeAllErrorElements(parentElement, validationErrorClass);

    if (status === 'INVALID') {
      const errorMessage = this.renderer.createElement('span');
      this.renderer.setProperty(errorMessage, 'innerText', this.errorMessage);
      this.renderer.addClass(errorMessage, validationErrorClass);
      this.renderer.appendChild(parentElement, errorMessage);
    }
  }

  private removeAllErrorElements(parent: any, validationErrorClass: string): void {
    const errorElements = parent.querySelectorAll(`.${validationErrorClass}`);
    errorElements.forEach((element: any) => {
      this.renderer.removeChild(parent, element);
    });
  }

  private subscribeOnStatusChanges(): void {
    console.log(this.ngControl);

    if (!this.ngControl?.control) {
      return;
    }

    this.ngControl.control.statusChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
      tap(status => this.handleErrors(status))
    ).subscribe();
  }
}
