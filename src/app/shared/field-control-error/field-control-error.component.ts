import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-field-control-error',
  templateUrl: './field-control-error.component.html',
  styleUrls: ['./field-control-error.component.scss'],
})
export class FieldControlErrorComponent {
  @Input() errorMessage: string = '';
  @Input() showError: boolean | undefined = false;
}
