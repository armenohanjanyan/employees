import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from '../../app/employee.model';
import { Response } from '@angular/http';
import { FirebaseService } from '../firebase.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmployeeModalComponent } from '../employee-modal/employee-modal.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public itemsToDelete = [];
  public employees: EmployeeModel[] = [];

  constructor(private firebaseService: FirebaseService, private matDialog: MatDialog) { }

  ngOnInit() {
    this.getEmployees()
  }

  getEmployees() {
    this.firebaseService.getEmployee()
      .subscribe(
        (employees: EmployeeModel[]) => {
          if(employees)
            this.employees = employees;
        }
      )
  }

  openDialog(employee) {
    let employeeCopy = null;
    if (employee) {
       employeeCopy = Object.assign({}, employee);
    }
    const dialogRef = this.matDialog.open(EmployeeModalComponent, {
      data: {employee: employeeCopy}
    });

    dialogRef.afterClosed().subscribe(action => {
      if (!action) return;
      if (action.type === 'create') {
        this.createEmployee(action.employee)
      } else {
        this.updateEmployee(action.employee);
      }

    });
  }

  createEmployee(employee) {
    employee.id = window.crypto.getRandomValues(new Uint32Array(1))[0];
    this.employees.unshift(employee);
    this.updateFirebase(this.employees);
  }

  updateEmployee(employee) {
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i].id === employee.id) {
        this.employees[i] = employee;
        break;
      }
    }
    this.updateFirebase(this.employees);
  }

  editEmployee(employee) {
    this.openDialog(employee);
  }

  deleteEmployee(employee) {
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i].id === employee.id) {
        this.employees.splice(i, 1);
        break;
      }
    }
    this.updateFirebase(this.employees);
  }

  updateFirebase(employees: EmployeeModel[]) {
    this.firebaseService.storeEmployees(employees)
        .subscribe();
  }

  removeEmployees() {
    this.employees = this.employees.filter(employee => !employee.removed);
    this.updateFirebase(this.employees);
  }

  selectAllEmployees(itemChecked) {
    if (!itemChecked) {
      this.employees.map(employee => employee.removed = true)
    } else {
      this.employees.map(employee => employee.removed = false)
    }
  }

}
