import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ArchitecteClass } from '../../../../core/models/ArchitecteClass';
import { ArchitectStatusEnum } from '../../../../shared/common/enums/ArchitectStatusEnum';

@Component({
  selector: 'app-architects-list',
  templateUrl: './architects-list.component.html',
  styleUrls: ['./architects-list.component.scss']
})
export class ArchitectsListComponent implements OnInit {

  @Input() architects: ArchitecteClass[];
  @Output() architectSelected: EventEmitter<ArchitecteClass> = new EventEmitter<ArchitecteClass>();
  createdArchitects: ArchitecteClass[];
  approvingArchitects: ArchitecteClass[];
  validatedArchitects: ArchitecteClass[];
  refusedArchitects: ArchitecteClass[];
  approvingArchitectsExpanded: boolean;
  createdArchitectsExpanded: boolean;
  validatedArchitectsExpanded: boolean;
  refusedArchitectsExpanded: boolean;

  constructor() { }

  ngOnInit() {
    this.createdArchitects = this.architects.filter(x => x.status === ArchitectStatusEnum.CREATED);
    this.approvingArchitects = this.architects.filter(x => x.status === ArchitectStatusEnum.APPROVING);
    this.validatedArchitects = this.architects.filter(x => x.status === ArchitectStatusEnum.VALIDATED);
    this.refusedArchitects = this.architects.filter(x => x.status === ArchitectStatusEnum.REFUSED);
  }

  architectClick(architect: ArchitecteClass) {
    this.architectSelected.emit(architect);
  }
}
