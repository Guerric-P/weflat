import { Component, OnInit, Input } from '@angular/core';
import { Visite } from 'app/models/visite';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.css']
})
export class VisitComponent implements OnInit {

  constructor() { }

  @Input() visite: Visite;

  ngOnInit() {
  }

}
