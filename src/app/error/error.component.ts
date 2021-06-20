import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';

@Component({
  templateUrl: './error.component.html',
})
export class ErrorComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private authSvc: AuthService
  ) {}

  redirectLogin() {
    this.dialogRef.close();
    this.authSvc.logout();
  }
}
