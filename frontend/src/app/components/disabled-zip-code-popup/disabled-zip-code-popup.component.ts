import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VisiteClass } from 'app/models/visiteclass';

@Component({
  selector: 'app-disabled-zip-code-popup',
  templateUrl: './disabled-zip-code-popup.component.html',
  styleUrls: ['./disabled-zip-code-popup.component.css']
})
export class DisabledZipCodePopupComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  visit: VisiteClass;

  @ViewChild('noArchitectsModal') noArchitectsModalTemplate: TemplateRef<any>;
  noArchitectsModal: NgbModalRef;
  @Input() OKFunction: Function;
  @Input() cancelFunction: Function;

  ngOnInit() {
  }

  open(visit: VisiteClass) {
    this.visit = visit;
    this.noArchitectsModal = this.modalService.open(this.noArchitectsModalTemplate);

    this.noArchitectsModal.result.then((result) => {
      if (this.OKFunction) {
        this.OKFunction();
      }
    }, (reason) => {
      if (this.cancelFunction) {
        this.cancelFunction();
      }
    });
  }

}
