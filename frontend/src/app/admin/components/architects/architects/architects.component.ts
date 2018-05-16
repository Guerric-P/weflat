import { Component, OnInit } from '@angular/core';
import { ArchitectService } from '../../../../shared/services/architecte.service';
import { ArchitectClass } from '../../../../core/models/ArchitectClass';
import * as ArrayUtils from '../../../../core/utils/arrayUtils';

@Component({
  selector: 'app-architects',
  templateUrl: './architects.component.html',
  styleUrls: ['./architects.component.scss']
})
export class ArchitectsComponent implements OnInit {

  architects: ArchitectClass[];
  selectedArchitect: ArchitectClass;

  constructor(private architecteService: ArchitectService) { }

  ngOnInit() {
    this.architecteService.getAll().subscribe(res => {
      this.architects = res;
    });
  }

  architectSelected(architect: ArchitectClass) {
    this.selectedArchitect = architect;
  }

  updated(event: ArchitectClass) {
    this.architects.splice(ArrayUtils.findIndexById(this.architects)(event.id), 1);
    this.architects = this.architects.concat([event]);
  }

}
