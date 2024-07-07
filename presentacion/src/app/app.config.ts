import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './helpers/interceptors/jwt.interceptor';
import { refreshInterceptor } from './helpers/interceptors/refresh.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
  provideRouter(routes),
  provideAnimationsAsync('noop'),
  provideHttpClient(withInterceptors([jwtInterceptor, refreshInterceptor])), 
  provideAnimationsAsync(), 
  provideAnimationsAsync(), //Se agrega el provedor cliente para el uso del backend
  
]
};
