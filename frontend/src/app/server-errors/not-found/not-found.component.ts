import { Component, Inject, OnInit, Optional, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RESPONSE, REQUEST } from '@nguniversal/express-engine/tokens';
import { Response, Request } from 'express';
import { TransferState } from '@angular/platform-browser';
import { Constantes } from 'app/shared/common/Constantes';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Inject(RESPONSE) private response: Response,
    @Optional() @Inject(REQUEST) private request: Request,
    private transferState: TransferState
  ) {
  }


  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      this.response.status(404);
      this.transferState.set(Constantes.SHOULD_NOT_LOAD_CLIENT, 'test');
    }
  }
}
