import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { VisiteClass } from '../../models/VisiteClass';
import { MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'app-disabled-zip-code-popup',
  templateUrl: './disabled-zip-code-popup.component.html',
  styleUrls: ['./disabled-zip-code-popup.component.scss']
})
export class DisabledZipCodePopupComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  visit: VisiteClass;

  @ViewChild('noArchitectsModal') noArchitectsModalTemplate: TemplateRef<any>;
  noArchitectsModal: MatDialogRef<any>;
  @Input() OKFunction: Function;
  @Input() cancelFunction: Function;

  ngOnInit() {
  }

  open(visit: VisiteClass) {
    this.visit = visit;
    this.noArchitectsModal = this.dialog.open(this.noArchitectsModalTemplate);

    this.noArchitectsModal.afterClosed().subscribe((result) => {
      if (result && this.OKFunction) {
        this.OKFunction();
      }
      else if (this.cancelFunction) {
        this.cancelFunction();
      }
    });
  }

  closeModal() {
    this.noArchitectsModal.close();
  }

}
