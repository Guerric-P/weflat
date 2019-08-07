import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.scss']
})
export class SignupModalComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<SignupModalComponent>,
    private router: Router
  ) { }

  ngOnInit() {
    this.dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate([`/register/${result}`]);
      }
    }, () => {

    });
  }

  close() {
    this.dialogRef.close();
  }
}
