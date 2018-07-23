import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EmployeeModel } from '../employee.model';


@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.css']
})
export class EmployeeModalComponent implements OnInit {
  public employee: EmployeeModel = {
    name: '',
    email: '',
    address: '',
    phone: '',
    id: ''
  }
  public isEditing = false;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<EmployeeModalComponent>) { }

  ngOnInit() {
    if (this.data.employee){
      this.employee = this.data.employee;
      this.isEditing = true;
    }

  }

  closeDialog() {
     if (this.isEditing) {
       this.dialogRef.close({type: 'update', employee: this.employee});
     } else {
        this.dialogRef.close({type: 'create', employee: this.employee});
     }
  }

  cancel() {
    this.dialogRef.close(null)
  }


}
