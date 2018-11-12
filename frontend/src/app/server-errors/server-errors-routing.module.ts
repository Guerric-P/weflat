import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: NotFoundComponent
  }
]

export let ServerErrorsRoutingModule = RouterModule.forChild(routes);
