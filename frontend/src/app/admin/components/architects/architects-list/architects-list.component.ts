import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ArchitectClass } from '@weflat/app/core/models/ArchitectClass';
import { ArchitectStatusEnum } from '@weflat/app/shared/common/enums/ArchitectStatusEnum';

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
