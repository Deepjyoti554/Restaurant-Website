import { Component, OnInit, Inject } from '@angular/core';
import { UsercartService } from 'src/app/shared/services/user/usercart.service';
import { order } from 'src/app/shared/models/user/userInterface';
import { customer, item } from 'src/app/shared/models/user/customerInterface';
import { UserdialogComponent } from '../userdialog/userdialog.component';
import { Router } from '@angular/router';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogConfig,
} from '@angular/material/dialog';
// import {MatButtonModule} from '@angular/material/button';
// import {FormsModule} from '@angular/forms';
// import {MatInputModule} from '@angular/material/input';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import { UserdialogComponent } from '../userdialog/userdialog.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  constructor(private router: Router, private cartService: UsercartService, public dialog: MatDialog) { }

  productArray: Array<order> = []

  temp: Array<any> = []

  // showNewButton = false;

  userId: any

  customerObject: customer = {
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

  openDialog(): void {
    const dialogRef = this.dialog.open(UserdialogComponent, {
      data: {},
    });
  }

  ngOnInit(): void {
    this.cartService.getApiData().subscribe({
      next: (data) => {
        this.productArray = data;
        console.log(this.productArray);
      }
    });
  }

  isItemPresent = false;

  addTocart(item: item) {
    console.log(item.itemId);
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {eventId: item.itemId};
    // this.dialog.open(UserdialogComponent, dialogConfig);


    console.log(item);
    let userData = JSON.parse(localStorage.getItem("localstorage")!);
    if (userData !== null) {
      let userName = userData[0];
      let userEmail = userData[1];
      let userPassword = userData[2];

      console.log("customerObject", this.customerObject);
      this.cartService.getCustomerData().subscribe((data: any) => {

        console.log(data);


        const match = data.find((customer: any) => {
          console.log("iam inside find data");

          return userName === customer.name;
        });
        // console.log("match", match);

        // add multiple time
        // var isItemPresent = false;
        // data.forEach((customer: any) => {
        //   customer.cart.forEach((cartItem: any) => {
        //     if (cartItem.itemId === item.itemId) {
        //       // this.userId = cartItem.itemId
        //       isItemPresent = true;
        //     }
        //   });
        // });
        // if (isItemPresent) {
        //   alert("You have alreeady added the already Product")
        // }



        console.warn("aa rha hu maiiii");
        console.log(match);
        if (match) {
          console.warn("inside match");


          this.customerObject.id = match.id;
          this.customerObject.customerId = "";
          this.customerObject.name = userName
          this.customerObject.email = userEmail
          this.customerObject.password = userPassword
          this.customerObject.status = ""
          this.customerObject.totalBill = 100
          this.customerObject.customization = ""
          this.customerObject.role = "customer";
          // match.cart.forEach((val: any) => {
          //   this.customerObject.cart.push(val);
          // });

          let added = false;

          //check item is pres or not
          const index = match.cart.findIndex((existingItem: any) => existingItem.name === item.name);

          if (index == -1) {
            added = true;
            console.log("Not added");
            this.customerObject.cart = [...match.cart, item];
            this.cartService.updateCustomerData(match.id, this.customerObject);
            this.openDialog();
            this.dialog.open(UserdialogComponent, dialogConfig);
          } else {
            // increase qty of item in pos index by 1;
            added = true;
            alert("You have already added the Item to Cart")

            this.customerObject.cart.forEach(val => {
              console.log(val.quantity);
              val.itemId = "";
              val.name = item.name;
              val.image = item.image
              val.description = item.description
              val.category = item.category
              val.price = item.price
              val.quantity = item.quantity
              val.rating = item.rating
              val.quantity = item.quantity
              val.customization = item.customization
              val.ingredients = item.ingredients
            });

            //Code for incr quantity
            let newQuantity: number = item.quantity++;
            this.customerObject.cart.forEach(val => {
              val.quantity = newQuantity;
            })

            this.customerObject.cart = [...match.cart];
            this.cartService.updateCustomerData(match.id, this.customerObject);
          }
          // match.cart.forEach((val: any) => {
          //   // added = true;
          //   console.log(val);

          //   console.log(val.name);
          //   console.log(item.name);


          //   // if (val.name == item.name) {
          //   //   // added = true;
          //   //   // console.log("Already added");

          //   //   // this.customerObject.cart.forEach(val => {
          //   //   //   console.log(val.quantity);
          //   //   //   val.itemId = "";
          //   //   //   val.name = item.name;
          //   //   //   val.image = item.image
          //   //   //   val.description = item.description
          //   //   //   val.category = item.category
          //   //   //   val.price = item.price
          //   //   //   val.quantity += 1;
          //   //   //   val.rating = item.rating
          //   //   //   val.quantity = item.quantity
          //   //   //   val.ingredients = item.ingredients
          //   //   //break;
          //   //   // });
          //   //   this.customerObject.cart = [...match.cart];
          //   //   this.cartService.updateCustomerData(match.id, this.customerObject);
          //   //   // break;
          //   // }
          //   // else {
          //   //   added = true;
          //   //   console.log("Not added");
          //   //   this.customerObject.cart = [...match.cart, item];
          //   //   this.cartService.updateCustomerData(match.id, this.customerObject);
          //   // }
          // })

          if (!added) {
            console.log("iam inside added");

            this.customerObject.cart = [item];
            this.cartService.updateCustomerData(match.id, this.customerObject);
          }

          // console.log(match.cart[0]);
          // console.log(item.name);

          // if(match.cart[0].name == item.name)
          // {
          //   console.log("already added");

          // }

          // this.customerObject.cart = [...match.cart, item];
          console.log(this.customerObject.cart);
          // this.userId = this.customerObject.cart[0].itemId
          // console.log("userId", this.userId);

          console.log("customerObject", this.customerObject);
          console.log("I am inside no one");

          // this.customerObject.cart.forEach((val: any) =>{
          //   console.log("val", val);
          //   console.log(val.itemId);
          //   console.log(item.itemId);

          //   if(val.itemId != item.itemId){
          //     this.cartService.updateCustomerData(match.id, this.customerObject);
          //   }
          // })

          // this.cartService.updateCustomerData(match.id, this.customerObject);

        }
        else {
          console.log("Iam inside update");
          this.customerObject.cart = [...match.cart, item];
          this.cartService.postCustomerData(this.customerObject);
        }
      });

      // this.cartService.postCustomerData(this.customerObject);
    } else {
      alert("Please log in");
    }
  }

  logOut() {
    console.log("delete");

    localStorage.clear();
    this.router.navigate(['/login']);
  }

  // againAddToCart()
  // {

  // }

  // displayCart(): void {
  //   let userData = JSON.parse(localStorage.getItem("localstorage")!);
  //   if (userData !== null) {
  //     console.log("customerObject", this.customerObject);
  //     this.cartService.postCustomerData(this.customerObject);
  //   }
  // }


}

