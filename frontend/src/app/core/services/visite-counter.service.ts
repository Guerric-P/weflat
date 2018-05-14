import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/first';
import { VisitService } from '../../shared/services/visit.service';

@Injectable()
export class VisiteCounterService {

  constructor(private visiteService: VisitService) {
    
  }

  private counterChangedSource = new Subject<number>();

  // Observable string streams
  counterChanged$ = this.counterChangedSource.asObservable();

  // Service message commands
  announceCount() {
    this.visiteService.getVisitCounter().first().subscribe(res => {
      this.counterChangedSource.next(res);
    });
  }
}
