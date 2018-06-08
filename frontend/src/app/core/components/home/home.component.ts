import { Component, OnInit } from '@angular/core';

declare var twttr: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    try {
      twttr.widgets.load();
    } catch (e) {
      console.log('Erreur lors du chargement du widget twitter...');
    }
  }
}
