import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SEOService {
  private readonly baseTitle = 'Weflat';

  constructor(private title: Title, private meta: Meta) { }

  updateTitle(title: string) {
    if (!title) {
      this.title.setTitle(this.baseTitle);
    } else {
      this.title.setTitle(`${title} - ${this.baseTitle}`);
    }
  }

  updateDescription(desc: string) {
    this.meta.updateTag({ name: 'description', content: desc });
  }
}
