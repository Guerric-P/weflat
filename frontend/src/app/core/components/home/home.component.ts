import { BreakpointObserver } from '@angular/cdk/layout';
import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, LOCALE_ID, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';

declare var twttr: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  architectOnboardingButtonImgSrc;
  @ViewChild('valentineTweet', { static: false }) valentineTweet: ElementRef<HTMLDivElement>;
  @ViewChild('nesrineTweet', { static: false }) nesrineTweet: ElementRef<HTMLDivElement>;
  isBrowser: boolean;

  constructor(
    private breakpointObserver: BreakpointObserver,
    @Inject(PLATFORM_ID) platformId: string,
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      twttr.widgets.createTweet(
        '827218845672865792',
        this.valentineTweet.nativeElement,
        {
          lang: this.locale
        }
      );
      twttr.widgets.createTweet(
        '844897780359409665',
        this.nesrineTweet.nativeElement,
        {
          lang: this.locale
        }
      );
    }
    this.breakpointObserver.observe('(max-width: 767px)').subscribe(res => {
      this.architectOnboardingButtonImgSrc = res.matches ? 'assets/living2_767px.jpg' : 'assets/living2_1140px.jpg';
    });
  }
}
