import { Component, OnInit } from '@angular/core';
import { ArchitecteService } from '../../../../shared/services/architecte.service';
import { ArchitecteClass } from '../../../../core/models/ArchitecteClass';

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

}
