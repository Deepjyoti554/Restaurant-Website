import { Component, OnInit, Inject } from '@angular/core';
import { UsercartService } from 'src/app/shared/services/user/usercart.service';
import { order } from 'src/app/shared/models/user/userInterface';
import { customer, item } from 'src/app/shared/models/user/customerInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salereport',
  templateUrl: './salereport.component.html',
  styleUrls: ['./salereport.component.scss']
})
export class SalereportComponent implements OnInit{
  constructor(private router: Router, private userService: UsercartService) { }

  customerData: Array<customer> = []

  ngOnInit(): void {
    this.userService.getCustomerData().subscribe((data: any) => {
      console.log(data);
      
      data.forEach((val:any) => {
        this.customerData.push(val);
      });
    })

    console.log(this.customerData);
    
  }
}
