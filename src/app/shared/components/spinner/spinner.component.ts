import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent {
  showSpinner$: Observable<boolean>
  constructor(private ns: NotificationService) {
    this.showSpinner$ = this.ns.spinner$
  }
}
