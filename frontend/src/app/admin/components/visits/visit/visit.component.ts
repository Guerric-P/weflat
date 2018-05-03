import { Component, OnInit, Input } from '@angular/core';
import { VisiteClass } from '../../../../core/models/VisiteClass';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.scss']
})
export class VisitComponent implements OnInit {

  @Input() visit: VisiteClass;

  constructor() { }

  ngOnInit() {
  }

}
