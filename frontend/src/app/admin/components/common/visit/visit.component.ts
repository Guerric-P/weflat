import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { VisitClass } from '../../../../core/models/VisitClass';
import { VisitStatusEnum } from '../../../../shared/common/enums/VisitStatusEnum';
import { MatDialogRef, MatDialog } from '@angular/material';
import { VisitService } from '../../../../shared/services/visit.service';

@Component({
  selector: 'admin-visit',
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
        this.visitService.cancel(this.visit.id).subscribe(res => {
          this.visit = res;
          this.updated.emit(res)
        });
      }
    });
  }
}
