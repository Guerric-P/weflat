import { Component, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-help-how-to-visit-modal',
  templateUrl: './help-how-to-visit-modal.component.html',
  styleUrls: ['./help-how-to-visit-modal.component.scss']
})
export class HelpHowToVisitModalComponent implements OnInit {

  constructor(private modalRef: MatDialogRef<HelpHowToVisitModalComponent>) { }

  ngOnInit() {
  }

  closeClicked() {
    this.modalRef.close();
  }

}
