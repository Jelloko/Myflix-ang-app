import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-dialog',
  standalone: false,
  template: `
    <h1 mat-dialog-title>{{ data.director.Name }}</h1>
    <div mat-dialog-content>
      <p>Bio: {{ data.director.Bio }}</p>
      <p>Birth: {{ data.director.Birth }}</p>
      <p>Death: {{ data.director.Death }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  `
})
export class DirectorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

