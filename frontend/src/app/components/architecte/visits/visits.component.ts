import { Component, OnInit } from '@angular/core';
import { Visite } from 'app/models/visite';
import { VisiteService } from 'app/services/visite.service';

declare var $:any;

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit {

  constructor(private visiteService: VisiteService) { }

  potentialVisites: Visite[];

  ngOnInit() {
    this.visiteService.getVisites().subscribe(
      res => {
        this.potentialVisites = res;
        if(this.potentialVisites && this.potentialVisites.length){
          $('#potentialVisites').collapse();
        }
      }, err => {

      }
    )
  }

}
