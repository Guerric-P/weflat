import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VisiteClass } from 'app/models/visiteclass';
import { VisiteService } from 'app/services/visite.service';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.css']
})
export class VisitComponent implements OnInit {

  constructor(private visiteService: VisiteService) { }

  @Input() visite: VisiteClass;
  @Output() updated: EventEmitter<any> = new EventEmitter();


  ngOnInit() {
  }

  accept() {
    this.visiteService.acceptVisite(this.visite.id).subscribe(res => {
      this.updated.emit();
    }, err => {
      this.updated.emit();
    });
  }

  refuse() {
    this.visiteService.refuseVisite(this.visite.id).subscribe(res => {
      this.updated.emit();
    }, err => {
      this.updated.emit();
    });
  }

}
