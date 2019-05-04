import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from '@app/_services/validation.service';

@Component({
  selector: 'control-messages',
  template: `<div *ngIf="errorMessage !== null">{{ErrorMessage}}</div>`
})
export class ControlMessagesComponent {
  errorMessage: string;
  @Input() control: FormControl;
  constructor() { }

  get ErrorMessage() {
    for (let propertyName in this.control.errors) {
      // if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
      if (this.control.errors.hasOwnProperty(propertyName)) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }
    return null;
  }
}
