import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { order } from '../../models/user/userInterface';
import { table } from 'src/app/shared/models/user/userTable';
import { customer } from '../../models/user/customerInterface';


@Injectable({
  providedIn: 'root'
})
export class UsercartService {

  private isLoggedIn = false;
  private userRole: string = ""

  constructor(private http: HttpClient) { }

  
  
  getApiData(): Observable<order[]> {
    return this.http.get<Array<order>>(`https://localhost:7180/api/Order`);
  }

  getOrderedDataById(id: string): Observable<order[]> {
    console.log(id);
    
    return this.http.get<Array<order>>(`https://localhost:7180/api/Order/${id}`);
  }

  getCustomerData(): any {
    return this.http.get<any>(`https://localhost:7180/api/Customer`);
  }

  getManagerData()
  {
    return this.http.get<any>(`https://localhost:7180/api/Manager`);
  }

  getStaffData()
  {
    return this.http.get<any>(`https://localhost:7180/api/Staff`);
  }

  getTableData()
  {
    return this.http.get<any>(`https://localhost:7180/api/BookTable`);
  }


  updateCustomerData(id: string, data: customer) {
    const url = `https://localhost:7180/api/Customer/${id}`;
    console.log(data);
    this.http.put(url, data).subscribe({
      next: res => {
        console.log("updateCustomerData", res);
      },
      error: err => {
        console.error("updateCustomerData error", err);
      }
    });
  }

  updateOrderData(id: string, order: order)
  {
    let url = `https://localhost:7180/api/Order/${id}`;
    console.log(order);
    
    this.http.put(url, order).subscribe(res => {
      console.log(res);
    })
  }


  postTableData(data: any)
  {
    let url = 'https://localhost:7180/api/BookTable'
    data.customerId = "";
    data.id = ""   
    data.status = ""; 
    console.log(data);
    return this.http.post(url, data).subscribe();
  }

  postsignUpFormData(data: any)
  {
    // console.log(data);
    // data.customerId = "";
    // data._id = "";
    // data.Items = []
    // data.Status = ""
    // data.orders = {};
    
    let url = 'https://localhost:7180/api/Customer'
    this.http.post(url, data).subscribe(res => {
      // console.log(res);
    });
  }

  postCustomerData(data : customer)
  {
    console.log("service",data);
    
    let url = 'https://localhost:7180/api/Customer'
    this.http.post<customer>(url, data).subscribe(res => {
      console.log("postCustomerData",res);
    });
  }

  postOrderData(data: order)
  {
    let url = `https://localhost:7180/api/Order`;
    this.http.post(url, data).subscribe(res => {
      console.log("postOrderData",res);
    });
  }



  deleteOrder(id: string)
  {
    let url = `https://localhost:7180/api/Order/${id}`
    this.http.delete(url).subscribe((res) => {
      console.log(res);
    });
  }

  


  //auth gaurd
  login(username: string, password: string): boolean {
    // This is just a demo implementation
    if (username === 'admin' && password === 'admin') {
      this.isLoggedIn = true;
      this.userRole = 'manager'; // Use a role like 'customer' or 'staff' instead for different users
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    this.userRole = "";
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  getRole(): string {
    return this.userRole;
  }

}
