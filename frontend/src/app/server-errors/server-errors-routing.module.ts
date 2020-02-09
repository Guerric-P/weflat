import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '@weflat/app/server-errors/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: NotFoundComponent
  }
]

export let ServerErrorsRoutingModule = RouterModule.forChild(routes);
