import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

declare var twttr: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  architectOnboardingButtonImgSrc;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    try {
      twttr.widgets.load();
    } catch (e) {
      console.log('Erreur lors du chargement du widget twitter...');
    }

    this.breakpointObserver.observe('(max-width: 767px)').subscribe(res => {
      this.architectOnboardingButtonImgSrc = res.matches ? 'assets/living2_767px.jpg' : 'assets/living2_1140px.jpg';
    });
  }
}
