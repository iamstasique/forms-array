import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterOutlet } from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { MainComponent } from "./pages/main/main.component";
import { MockBackendInterceptor } from "./shared/mock-backend/mock-backend.interceptor";

@NgModule({
  declarations: [AppComponent],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: MockBackendInterceptor, multi: true },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    RouterOutlet,
    NgbModule,
    MainComponent
  ]
})
export class AppModule { }
