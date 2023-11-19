import { Component, OnInit } from '@angular/core';
import { staff } from 'src/app/shared/models/staff/staffModel';
import { StaffService } from 'src/app/shared/services/staff/staff.service';

@Component({
  selector: 'app-staffdetails',
  templateUrl: './staffdetails.component.html',
  styleUrls: ['./staffdetails.component.scss']
})
export class StaffdetailsComponent {
  constructor(private staffService: StaffService){}

  staffDetails: Array<staff> = []

  ngOnInit(): void {
    let staffData = JSON.parse(localStorage.getItem("localstorage")!);
    if(staffData!= null)
    {
      let userName = staffData[0];
      let userEmail = staffData[1];
      let userPassword = staffData[2];

      
      this.staffService.getStaffData().subscribe((data: any) => {

        console.log(data);

        const match = data.find((staff: any) => {
          console.log("iam inside find data");

          return userName === staff.name && userEmail == staff.email && userPassword == staff.password;
        });
        console.log(match);

        this.staffDetails.push(match)
        console.log(this.staffDetails);
        
        
      });
    }
  }
}
