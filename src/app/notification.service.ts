import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public dialog: MatDialog) { }

  openDialog(id:any, message: string, subTitle: string, buttonCloseDisabled?: boolean, context?: any, confirmAction?: () => void) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {
      id: id, 
      title: message, 
      subTitle: subTitle,
      buttonCloseDisabled: buttonCloseDisabled
      }});
    dialogRef.afterClosed().subscribe(res => {
      if (res && confirmAction && context) confirmAction.call(context);
    });
  }

}
