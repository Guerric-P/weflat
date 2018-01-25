import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/first';
import { VisiteService } from 'app/services/visite.service';

@Injectable()
export class VisiteCounterService {

  constructor(private visiteService: VisiteService) {
    
  }

  private counterChangedSource = new Subject<number>();

  // Observable string streams
  counterChanged$ = this.counterChangedSource.asObservable();

  // Service message commands
  announceCount() {
    this.visiteService.getVisiteCounter().first().subscribe(res => {
      this.counterChangedSource.next(res);
    });
  }
}
