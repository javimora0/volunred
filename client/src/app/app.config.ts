import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';


registerLocaleData(es);

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient()]
};
