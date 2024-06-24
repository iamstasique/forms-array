import { Directive, HostListener, Input, OnInit, inject } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[appValidationTooltip]',
  standalone: true,
  providers: [MatTooltip]
})
export class ValidationTooltipDirective implements OnInit {
  @Input({ required: true }) fieldForValidation!: 'country' | 'userName' | 'birthday'

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.ngControl.invalid) {
      this.tooltip.show();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.tooltip.hide();
  }

  private ngControl: NgControl = inject(NgControl);
  private tooltip: MatTooltip = inject(MatTooltip);

  ngOnInit(): void {
    this.setErrorMessage();
  }

  private setErrorMessage(): void {
    const normalizedFieldsNames = {
      country: 'Country',
      userName: 'User name',
      birthday: 'Birthday'
    };

    this.tooltip.message = `Please provide a correct ${normalizedFieldsNames[this.fieldForValidation]}`;
  }
}
