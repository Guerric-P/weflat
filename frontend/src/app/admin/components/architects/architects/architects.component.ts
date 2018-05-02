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

  updated(event: ArchitecteClass) {
    // TODO replace with lodash compose
    let compose = f => g => x => f(g(x));
    let findById = array => id => array.find(x => x.id === id);
    let findIndex = array => item => array.indexOf(item);
    let findIndexById = array => compose(findIndex(array))(findById(array));
    this.architects.splice(findIndexById(this.architects)(event.id), 1);
    this.architects = this.architects.concat([event]);
  }

}
