import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  showModal$: Observable<boolean>
  constructor(private ns: NotificationService) { }

  closeModal() {
    this.ns.closeModal()
  }

  ngOnInit(): void {
    this.showModal$ = this.ns.modal$
  }
}
