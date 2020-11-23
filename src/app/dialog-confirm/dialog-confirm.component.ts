import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.css']
})
export class DialogConfirmComponent implements OnInit {
  id: any;
  title: string = '';
  subTitle: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { 
      this.title = data.title;
      this.subTitle = data.subTitle;
    }

  ngOnInit(): void {
  }

  closeModal(result: boolean) {
    this.dialogRef.close(result);
  }

}
