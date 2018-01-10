import { Component, OnInit, Input } from '@angular/core';
import { VisiteClass } from 'app/models/visiteclass';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.css']
})
export class VisitComponent implements OnInit {

  constructor() { }

  @Input() visite: VisiteClass;

  ngOnInit() {
  }

}
