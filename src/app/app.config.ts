import { ApplicationConfig, provideZoneChangeDetection, isDevMode, ErrorHandler } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideServiceWorker } from '@angular/service-worker';
import { authInterceptor } from './interceptors/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { GlobalErrorHandler } from './services/global-error-handler.service';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: definePreset(Aura, {
          semantic: {
            primary: {
              50: '#f0faf4', 100: '#dcf5e7', 200: '#b9eacf', 300: '#86d9a8',
              400: '#4ec07a', 500: '#258949', 600: '#1e7040', 700: '#185c34',
              800: '#134a2a', 900: '#0e3b21', 950: '#092616'
            },
            colorScheme: {
              light: {
                surface: {
                  0: '#ffffff', 50: '#f7faf7', 100: '#f0f5f0',
                  200: '#e0ebe0', 300: '#c8d8c8', 400: '#a0bca0',
                  500: '#6b8f6b', 600: '#4a6e4a', 700: '#2e4e2e',
                  800: '#1a2e1a', 900: '#0f1f0f', 950: '#080f08'
                }
              }
            }
          }
        }),
        options: { darkModeSelector: 'none' }
      }
    }),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ]
};
