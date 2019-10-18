import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { VisitClass } from '@weflat/core/models/VisitClass';
import { VisitStatusEnum } from '@weflat/shared/common/enums/VisitStatusEnum';
import { VisitService } from '@weflat/shared/services/visit.service';




@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.scss']
})
export class VisitComponent implements OnInit {

  @Input() visit: VisitClass;
  @Output() updated: EventEmitter<VisitClass> = new EventEmitter<VisitClass>();
  @ViewChild('confirmModal') confirmModalTemplate: TemplateRef<any>;
  confirmModal: MatDialogRef<any>;
  public VisitStatusEnum = VisitStatusEnum;

  constructor(
    private matDialog: MatDialog,
    private visitService: VisitService
  ) { }

  ngOnInit() {

  }

  cancelClick() {
    this.confirmModal = this.matDialog.open(this.confirmModalTemplate);

    this.confirmModal.afterClosed().subscribe(res => {
      if (res) {
        this.visitService.cancel(this.visit.id).subscribe(visit => {
          this.visit = visit;
          this.updated.emit(visit)
        });
      }
    });
  }

  architectPaidClick() {
    this.confirmModal = this.matDialog.open(this.confirmModalTemplate);

    this.confirmModal.afterClosed().subscribe(res => {
      if (res) {
        this.visitService.architectPaid(this.visit.id).subscribe(visit => {
          this.visit = visit;
          this.updated.emit(visit)
        });
      }
    });
  }
}
