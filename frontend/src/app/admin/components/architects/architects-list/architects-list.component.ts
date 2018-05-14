import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ArchitectClass } from '../../../../core/models/ArchitectClass';
import { ArchitectStatusEnum } from '../../../../shared/common/enums/ArchitectStatusEnum';

@Component({
  selector: 'app-architects-list',
  templateUrl: './architects-list.component.html',
  styleUrls: ['./architects-list.component.scss']
})
export class ArchitectsListComponent implements OnInit, OnChanges {


  @Input() architects: ArchitectClass[];
  @Output() architectSelected: EventEmitter<ArchitectClass> = new EventEmitter<ArchitectClass>();
  createdArchitects: ArchitectClass[];
  approvingArchitects: ArchitectClass[];
  validatedArchitects: ArchitectClass[];
  refusedArchitects: ArchitectClass[];
  approvingArchitectsExpanded: boolean;
  createdArchitectsExpanded: boolean;
  validatedArchitectsExpanded: boolean;
  refusedArchitectsExpanded: boolean;

  constructor() { }

  ngOnInit() {
    this.filterArchitects();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filterArchitects();
  }

  filterArchitects() {
    this.createdArchitects = this.architects.filter(x => x.status === ArchitectStatusEnum.CREATED);
    this.approvingArchitects = this.architects.filter(x => x.status === ArchitectStatusEnum.APPROVING);
    this.validatedArchitects = this.architects.filter(x => x.status === ArchitectStatusEnum.VALIDATED);
    this.refusedArchitects = this.architects.filter(x => x.status === ArchitectStatusEnum.REFUSED);
  }

  architectClick(architect: ArchitectClass) {
    this.architectSelected.emit(architect);
  }
}
