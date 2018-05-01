import { Component, OnInit, Input } from '@angular/core';
import { ArchitecteClass } from '../../../../core/models/ArchitecteClass';

@Component({
  selector: 'app-architect',
  templateUrl: './architect.component.html',
  styleUrls: ['./architect.component.scss']
})
export class ArchitectComponent implements OnInit {

  @Input() architect: ArchitecteClass;

  constructor() { }

  ngOnInit() {
  }

}
