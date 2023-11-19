import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { order } from 'src/app/shared/models/user/userInterface';
import { customer, item, ingredient } from 'src/app/shared/models/user/customerInterface';
import { UsercartService } from 'src/app/shared/services/user/usercart.service';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogConfig,
} from '@angular/material/dialog';

@Component({
  selector: 'app-userdialog',
  templateUrl: './userdialog.component.html',
  styleUrls: ['./userdialog.component.scss'],
})
export class UserdialogComponent {
  dialogData: FormGroup = this.fb.group({});

  itemId: string = "";
  constructor(
    public dialogRef: MatDialogRef<UserdialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private userService: UsercartService, public dialog: MatDialog) {
    this.itemId = data.eventId;
    console.log(data.eventId);
    // console.log(data);
  }

  ingredientObject: ingredient = {
    ingredientId: "",
    name: "",
    quantity: 1
  }


  itemObject: item = {
    itemId: "",
    name: "",
    image: "",
    description: "",
    category: "",
    price: 1,
    rating: 0,
    quantity: 1,
    customization: "",
    ingredients: this.ingredientObject
  }

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

  ngOnInit(): void {
    this.dialogData = this.fb.group({
      customization: ['']
    })
  }

  onNoClick(): void {
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onSubmit() {
    this.dialog.closeAll();
    console.log(this.dialogData.value);

    let userData = JSON.parse(localStorage.getItem("localstorage")!);
    if (userData !== null) {
      let userName = userData[0];
      let userEmail = userData[1];
      let userPassword = userData[2];
      let userRole = userData[3];

      this.userService.getCustomerData().subscribe((data: any) => {
        const user = data.find((customer: any) => {
          return (
            customer.name === userName
            && customer.email === userEmail
            && customer.password === userPassword
            && customer.role === userRole
          );
        });

        if (user) {
          console.warn(user);

          this.customerObject.id = user.id;
          this.customerObject.customerId = "";
          this.customerObject.name = userName
          this.customerObject.email = userEmail
          this.customerObject.password = userPassword
          this.customerObject.status = ""
          this.customerObject.totalBill = 100;
          this.customerObject.customization = this.dialogData.value.customization;
          this.customerObject.role = "customer";



          console.log(this.customerObject);
          user.cart.forEach((val: any) => {
            console.log(val);
            console.log(val.itemId);
            console.log(this.itemId);
            
            if(val.itemId == this.itemId){
              val.customization = this.dialogData.value.customization;
            }
          });

          this.customerObject.cart = [...user.cart];
          this.userService.updateCustomerData(user.id, this.customerObject);
        }
      })
    }
  }
}