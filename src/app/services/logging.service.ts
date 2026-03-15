import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  /**
   * Central place to send client-side errors.
   * Wire this up to a backend or logging provider (e.g. Sentry) in production.
   */
  logError(error: unknown, context?: string): void {
    // eslint-disable-next-line no-console
    console.error('[ClientError]', { context, error });
  }
}

