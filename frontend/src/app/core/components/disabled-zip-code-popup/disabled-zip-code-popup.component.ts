import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { VisitClass } from '@weflat/core/models/VisitClass';


@Component({
  selector: 'app-disabled-zip-code-popup',
  templateUrl: './disabled-zip-code-popup.component.html',
  styleUrls: ['./disabled-zip-code-popup.component.scss']
})
export class DisabledZipCodePopupComponent implements OnInit {

  visit: VisitClass;
  @ViewChild('noArchitectsModal') noArchitectsModalTemplate: TemplateRef<any>;
  noArchitectsModal: MatDialogRef<any>;
  @Input() OKFunction: Function;
  @Input() cancelFunction: Function;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  open(visit: VisitClass) {
    this.visit = visit;
    this.noArchitectsModal = this.dialog.open(this.noArchitectsModalTemplate);

    this.noArchitectsModal.afterClosed().subscribe((result) => {
      if (result && this.OKFunction) {
        this.OKFunction();
      } else if (this.cancelFunction) {
        this.cancelFunction();
      }
    });
  }

  closeModal() {
    this.noArchitectsModal.close();
  }

}
