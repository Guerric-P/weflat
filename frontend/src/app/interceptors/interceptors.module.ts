import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CsrfInterceptor } from '@weflat/interceptors/interceptors/csrf-interceptor.service';
import { WeflatInterceptor } from '@weflat/interceptors/interceptors/http-interceptor.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CsrfInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WeflatInterceptor,
      multi: true,
    }
  ]
})
export class InterceptorsModule { }
