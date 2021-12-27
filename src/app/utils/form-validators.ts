import { Directive } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Directive()
export abstract class FormValidators {
  formGroup!: FormGroup;

  checkFormValidations(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      control?.markAsDirty();
      control?.markAsTouched();
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.checkFormValidations(control);
      }
    });
  }

  resetForm() {
    this.formGroup.reset();
  }

  checkTouched(field: string): boolean | undefined {
    if (field == undefined) {
      return;
    }
    return (
      !this.formGroup.get(field)?.valid &&
      (this.formGroup.get(field)?.touched || this.formGroup.get(field)?.dirty)
    );
  }

  checkRequired(field: string) {
    return (
      this.formGroup.get(field)?.hasError('required') &&
      (this.formGroup.get(field)?.touched || this.formGroup.get(field)?.dirty)
    );
  }

  checkEmail() {
    const fieldEmail = this.formGroup.get('email');
    if (fieldEmail?.errors) {
      return fieldEmail.errors['email'] && fieldEmail.touched;
    }
  }

  applyCSSerror(field: string) {
    return {
      'has-error': this.checkTouched(field),
      'has-feedback': this.checkTouched(field),
    };
  }
}
