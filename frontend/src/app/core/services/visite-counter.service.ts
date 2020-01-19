import { Injectable } from '@angular/core';
import { VisitService } from '@weflat/app/shared/services/visit.service';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable()
export class VisiteCounterService {

  private counterChangedSource = new Subject<number>();

  // Observable string streams
  counterChanged$ = this.counterChangedSource.asObservable();

  constructor(private visiteService: VisitService) {

  }

  // Service message commands
  announceCount() {
    this.visiteService.getVisitCounter().pipe(
      first()
    ).subscribe(res => {
      this.counterChangedSource.next(res);
    });
  }
}
