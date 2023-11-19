import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { staff } from '../../models/staff/staffModel';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private http: HttpClient) { }

  getStaffData(): Observable<staff>
  {
    return this.http.get<staff>(`https://localhost:7180/api/Staff`)
  }

  updateStaff(id: string, staff: staff)
  {
    console.log(id, staff);
    
    let url = `https://localhost:7180/api/Staff/${id}`;

    this.http.put(url, staff).subscribe(res => {
      console.log(res);
    });
  }
}
