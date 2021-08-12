import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmpService } from './emp.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  public page:number = 1;
  public pageSize:number = 10;
  employeeForm: FormGroup | any;
  employeeList: any;
  empid: any;
  btnSave = "Save";
  HeaderValue = "Add"
  p: number = 1;
  constructor(private fb: FormBuilder, private http: HttpClient, private empservice: EmpService) {
  }

  ngOnInit() {
    this.employeeForm=this.fb.group({
      date:[''],
      open:[''],
      high:[''],
      low: [''],
      close:['']
    })
    this.GetEmployeedata();
  }

  public open(component: any) {
    debugger;
    if (component == 'dialog') {
      this.employeeForm.reset();
      this.btnSave = 'Add'
    }
    else {
      this.empservice.getEmployeeId(component).subscribe(data => {
        let result: any = data;
        this.empid = result.id;
        this.btnSave = 'Update';
        this.HeaderValue = 'Update';
        this.employeeForm.patchValue(data);
      })
    }

  }

  OnSubmit() {
    debugger
    if(this.empid && this.empid > 0)
    {
      debugger
      const empdataforupdate = { id:this.empid,Date: this.employeeForm.controls.date.value,
        Open: this.employeeForm.controls.open.value, High: this.employeeForm.controls.high.value, 
        Low: this.employeeForm.controls.low.value,Close: this.employeeForm.controls.close.value };
      this.empservice.updateEmployee(empdataforupdate).subscribe(data =>{
        
        this.employeeForm.reset();
        this.btnSave='Save';
        this.empid = 0;
        this.GetEmployeedata();
      })
        
    }
    else{
    this.empservice.saveEmployee(this.employeeForm.value).subscribe( data =>{
        console.log(data);
       this.GetEmployeedata();
      this.employeeForm.reset();
    })
  }
  }
    GetEmployeedata(){
      debugger
      this.empservice.getEmployee().subscribe( data =>{
        this.employeeList=data;
      })
  }

  delete(id: any)
  {
    this.empservice.deleteEmployee(id).subscribe(data =>{
      console.warn('deleted a record');
      this.GetEmployeedata();
    })
  }
}
