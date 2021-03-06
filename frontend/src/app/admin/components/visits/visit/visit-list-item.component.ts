import { Component, Input, OnInit } from '@angular/core';
import { VisitClass } from '@weflat/app/core/models/VisitClass';

@Component({
  selector: 'app-visit-list-item',
  templateUrl: './visit-list-item.component.html',
  styleUrls: ['./visit-list-item.component.scss']
})
export class VisitListItemComponent implements OnInit {

  @Input() visit: VisitClass;

  constructor() { }

  ngOnInit() {
  }

}
