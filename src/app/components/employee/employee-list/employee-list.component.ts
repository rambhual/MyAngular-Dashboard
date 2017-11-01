import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { IEmployee } from 'app/shared/Interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'at-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  newEmployee: boolean;
  public firstName: '';
  public lastName: '';
  public born: '';
  public email: '';
  public mobile: '';
  myForm: FormGroup;
  newEmployeButtonName = false;
  employeeRef: AngularFirestoreCollection<IEmployee>;
  employees: Observable<IEmployee[]>;
  employeesss: any;
  constructor(
    private employeeService: EmployeeService,
    private afs: AngularFirestore,
    public fb: FormBuilder
  ) { }
  ngOnInit() {
    this.getEmployees();
    this.myForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      born: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
    });
  }
  Add() {
    this.newEmployee = !this.newEmployee;
    this.newEmployeButtonName = !this.newEmployeButtonName;
  }
  getEmployees() {
    this.employeeRef = this.afs.collection('employees');
    this.employees = this.employeeRef.valueChanges();

    this.employeesss = this.employeeRef.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as IEmployee;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });
  }
  onSubmit(newEmployee) {
    console.log(newEmployee);
    this.employeeService.addEmployee(newEmployee)
    this.newEmployee = !this.newEmployee;
  }
}
interface EmployeeId extends IEmployee {
  id: string;
};
