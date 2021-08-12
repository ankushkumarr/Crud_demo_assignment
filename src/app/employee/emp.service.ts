import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpService {

  constructor(private http:HttpClient) { }

saveEmployee(EmployeeData: any) {
   return this.http.post('https://localhost:44358/emp', EmployeeData);
}

updateEmployee(EmployeeData: any) {
  return this.http.put('https://localhost:44358/emp', EmployeeData);
}

getEmployee() {
  debugger
  return this.http.get('https://localhost:44358/emp');
}

deleteEmployee(empid: any) {
  return this.http.delete('https://localhost:44358/emp/' + empid);
}

getEmployeeId(empid: any) {
  debugger
  return this.http.get('https://localhost:44358/emp/' + empid);
}
}
