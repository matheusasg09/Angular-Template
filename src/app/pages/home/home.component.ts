import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/common/loader/loader.service';
import { NotificationService } from 'src/app/services/common/notification/notification.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private loader: LoaderService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.notification.success('teste');
  }
}
