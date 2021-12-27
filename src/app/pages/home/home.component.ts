import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NotificationService } from 'src/app/services/common/notification/notification.service';
import { FormValidators } from 'src/app/utils/form-validators';

@Component({
  templateUrl: './home.component.html',

  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends FormValidators implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.notificationService.error('Campos Inválidos');
      return;
    }
    console.log(this.formGroup.getRawValue());
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }
}
