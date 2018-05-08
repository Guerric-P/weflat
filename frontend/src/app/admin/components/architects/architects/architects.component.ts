import { Component, OnInit } from '@angular/core';
import { ArchitecteService } from '../../../../shared/services/architecte.service';
import { ArchitecteClass } from '../../../../core/models/ArchitecteClass';
import * as ArrayUtils from '../../../../core/utils/arrayUtils';

@Component({
  selector: 'app-architects',
  templateUrl: './architects.component.html',
  styleUrls: ['./architects.component.scss']
})
export class ArchitectsComponent implements OnInit {

  architects: ArchitecteClass[];
  selectedArchitect: ArchitecteClass;

  constructor(private architecteService: ArchitecteService) { }

  ngOnInit() {
    this.architecteService.getAll().subscribe(res => {
      this.architects = res;
    });
  }

  architectSelected(architect: ArchitecteClass) {
    this.selectedArchitect = architect;
  }

  updated(event: ArchitecteClass) {
    this.architects.splice(ArrayUtils.findIndexById(this.architects)(event.id), 1);
    this.architects = this.architects.concat([event]);
  }

}
