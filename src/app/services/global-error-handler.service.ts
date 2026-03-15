import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoggingService } from './logging.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private snackBar: MatSnackBar,
    private loggingService: LoggingService,
    private zone: NgZone
  ) { }

  handleError(error: unknown): void {
    this.loggingService.logError(error, 'GlobalErrorHandler');

    // Ensure the snackbar runs inside Angular zone
    this.zone.run(() => {
      this.snackBar.open('Something went wrong. Please try again.', '', {
        duration: 4000,
      });
    });

    // Re-throw or log to console for visibility during development
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

