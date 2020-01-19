import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '@weflat/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SEOService {
  private readonly baseTitle = 'Weflat';
  private readonly testWarning = '[TEST] ';

  constructor(private title: Title, private meta: Meta) { }

  updateTitle(title: string) {
    const fullTitle = this.generateTitle(title);
    this.title.setTitle(fullTitle);
  }

  generateTitle(title: string): string {
    let fullTitle = title ? `${title} - ${this.baseTitle}` : this.baseTitle;
    fullTitle = (environment.displayTestWarning ? this.testWarning : '') + fullTitle;
    return fullTitle;
  }

  updateDescription(desc: string) {
    this.meta.updateTag({ name: 'description', content: desc });
  }
}
