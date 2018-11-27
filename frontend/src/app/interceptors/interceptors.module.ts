import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { WeflatInterceptor } from './interceptors/http-interceptor.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WeflatInterceptor,
      multi: true,
    }
  ]
})
export class InterceptorsModule { }
