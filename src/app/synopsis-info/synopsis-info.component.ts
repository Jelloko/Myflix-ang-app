import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component for displaying a synopsis dialog.
 * This dialog shows the synopsis of a movie or content passed via the `MAT_DIALOG_DATA` injection token.
 */
@Component({
  selector: 'app-synopsis-dialog',
  standalone: false,
  template: `
    <h1 mat-dialog-title>Synopsis</h1>
    <div mat-dialog-content>
      <p>{{ data }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  `
})
export class SynopsisDialogComponent {
  /**
   * Injected data representing the synopsis to display.
   * 
   * @param data - The synopsis text passed to the dialog.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}


