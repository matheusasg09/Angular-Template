import { Component, OnInit } from '@angular/core';

import { ModalControl } from 'src/app/components/modal/ModalControl';

import { LoaderService } from 'src/app/services/common/loader/loader.service';
import { NotificationService } from 'src/app/services/common/notification/notification.service';

@Component({
  templateUrl: './home.component.html',

  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  modalControl = new ModalControl();

  constructor(
    private loader: LoaderService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {}
}
