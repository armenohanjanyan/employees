import { Injectable } from '@angular/core';
import { EmployeeModel } from './employee.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Response } from '@angular/http'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private http: HttpClient) { }


  storeEmployees(employees: EmployeeModel[]) {
    return this.http.put('https://employees-1665c.firebaseio.com/employees.json', employees);
  }

  getEmployee() {
    return this.http.get('https://employees-1665c.firebaseio.com/employees.json');
  }



}
