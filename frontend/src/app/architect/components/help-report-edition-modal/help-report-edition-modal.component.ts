import { Component, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-help-report-edition-modal',
  templateUrl: './help-report-edition-modal.component.html',
  styleUrls: ['./help-report-edition-modal.component.scss']
})
export class HelpReportEditionModalComponent implements OnInit {

  constructor(private modalRef: MatDialogRef<HelpReportEditionModalComponent>) { }

  ngOnInit() {
  }

  closeClicked() {
    this.modalRef.close();
  }

}
