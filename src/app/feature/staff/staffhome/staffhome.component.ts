import { Component, OnInit, OnChanges } from '@angular/core';
import { UsercartService } from 'src/app/shared/services/user/usercart.service';
import { order } from 'src/app/shared/models/user/userInterface';
import { customer, item, ingredient } from 'src/app/shared/models/user/customerInterface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { staff } from 'src/app/shared/models/staff/staffModel';

@Component({
  selector: 'app-staffhome',
  templateUrl: './staffhome.component.html',
  styleUrls: ['./staffhome.component.scss']
})
export class StaffhomeComponent {
  constructor(private router: Router, private fb: FormBuilder, private cartService: UsercartService) { }

  ingredients : ingredient = {
    ingredientId : "",
    name : "",
    quantity : 0
}

  items : item = {
    itemId : "",
    name: "",
    image: "",
    description: "",
    category: "",
    price: 0,
    rating: 0,
    quantity: 0,
    customization: "",
    ingredients: this.ingredients
}

  userDetails: customer = {
    id: "",
    customerId: "",
    name: "",
    email: "",
    password: "",
    role: "",
    cart: [],
    status: "",
    totalBill: 0,
    customization: ""
  }

  temp: Array<customer> = []

  ngOnInit(): void {
    this.cartService.getCustomerData().subscribe({
      next: (data : any) => {
        // this.temp.push(data)
        this.temp = data
        console.log(this.temp);
        // this.userDetails.id = data[0].id
        // this.userDetails.customerId = data[0].customerId
        // this.userDetails.name = data[0].name
        // console.log(data[0].name);
        
        // this.userDetails.email = data[0].email
        // this.userDetails.password = data[0].password
        // this.userDetails.role = data[0].role
        // this.userDetails.status = data[0].status
        // this.userDetails.totalBill = data[0].totalBill
        // this.userDetails.customization = data[0].customization
        // data.forEach((val : any) => {
        //   val.cart.forEach((item : any) => {
        //     this.userDetails.cart.push(item);
        //   });
          
        // });
        // console.log(this.userDetails);
        
      }
    });

  }

  // isItemPresent = false;

  // addToOrder() {
  //   this.router.navigate(['/addorder']);
  // }

  // deleteToOrder(order: order) {
  //   let id = order.id;
  //   this.cartService.deleteOrder(id);
  //   this.router.navigate(['/managerhome']);
  // }

  // editToOrder(item : order)
  // {
  //   window.location.href = '/editorder?id=' + item.id;
  //   // this.router.navigate(['/editorder']);
  // }

 
}
