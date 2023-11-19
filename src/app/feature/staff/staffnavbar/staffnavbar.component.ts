import { Component, OnInit } from '@angular/core';
import { StaffService } from 'src/app/shared/services/staff/staff.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staffnavbar',
  templateUrl: './staffnavbar.component.html',
  styleUrls: ['./staffnavbar.component.scss']
})
export class StaffnavbarComponent implements OnInit {
  constructor(private router: Router, private staffService: StaffService) { }

  staffDetails: Array<any> = []

  ngOnInit(): void {

    let userData = JSON.parse(localStorage.getItem("localstorage")!);
    if (userData !== null) {
      let userName = userData[0];
      let userEmail = userData[1];
      let userPassword = userData[2];

      this.staffService.getStaffData().subscribe((data: any) => {
        console.log(data);
        const isStaff = data.find((val: any) => {
          return userName == val.name && userEmail == val.email && userPassword == val.password
        });
        this.staffDetails.push(isStaff)
        console.log(this.staffDetails);
      })
    }
  }

  deleteUser() {
    console.log("delete");

    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
