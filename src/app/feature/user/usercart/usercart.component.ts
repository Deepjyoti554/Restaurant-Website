import { Component, OnInit } from '@angular/core';
import { UsercartService } from 'src/app/shared/services/user/usercart.service';
import { order } from 'src/app/shared/models/user/userInterface';
import { customer, item, ingredient } from 'src/app/shared/models/user/customerInterface';

declare var Razorpay: any;

@Component({
  selector: 'app-usercart',
  templateUrl: './usercart.component.html',
  styleUrls: ['./usercart.component.scss']
})
export class UsercartComponent implements OnInit {
  constructor(private userService: UsercartService) { }

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

  userArray: Array<item> = []

  totalPrice: number = 0

  customization: string = ""

  //update order
  orderArray: order = {
    id: "",
    customerId: "",
    items: [],
    totalPrice: 1,
    status: "",
    customization: ""
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

  ngOnInit(): void {
    let userData = JSON.parse(localStorage.getItem("localstorage")!);
    if (userData !== null) {
      let userName = userData[0];
      let userEmail = userData[1];
      let userPassword = userData[2];
      let userRole = userData[3];
      this.userService.getCustomerData().subscribe((data: any) => {
        const match = data.find((customer: any) => {
          return (
            customer.name === userName
            && customer.email === userEmail
            && customer.password === userPassword
            && customer.role === userRole
          );
        });

        if (match) {
          // this.customization = match.customization
          console.log("match", match);

          // console.log("Get the user");
          match.cart.forEach((val: any) => {
            // console.log(val);
            // val.quantity = 1;
            this.userArray.push(val);
            this.totalPrice += val.price;
          });
          console.log(this.userArray);
          console.log(this.totalPrice);
          
          this.userDetails = match
          this.userDetails.totalBill = this.totalPrice;
          this.userService.updateCustomerData(match.id, this.userDetails);
          // console.log(this.userDetails);

          // console.log(typeof this.userArray)
          // console.log("userArray", this.userArray);


        } else {
          // console.log("Not getting the user");
        }
      })
    }

  }

  cart: Array<item> = []
  deleteItem(product: item) {
    console.log("Deleting the item");
    
    this.totalPrice -= product.price * product.quantity;
    this.userDetails.totalBill = this.totalPrice;


    console.log(this.totalPrice);
    console.log(product.price);
    
    
    let id = product.itemId;
    let userId = this.userDetails.id
    // console.log("userID", userId);

    this.cart = this.userArray.filter(item => item.itemId != id)
    // console.log("userArrayBefore", this.userArray);
    this.userArray = this.cart;
    this.userDetails.cart = this.userArray

    // this.totalPrice = this.userArray.reduce((acc, val) => acc + (val.price * val.quantity), 0);

    // console.log("userArrayAfter", this.userArray);
    this.userService.updateCustomerData(userId, this.userDetails);
    // this.userArray.forEach((val: any) => {
    //   this.totalPrice -= val.price;
    //   console.log("here");
    //   console.log(this.totalPrice);
      
      
    // });
  }

  deleteCartItem(item: item) {
    // this.totalPrice -= item.price;
    
    // item.quantity--;

    item.quantity -= 1;
    this.totalPrice -= item.price;
    console.log(this.totalPrice);
    

    let userId = this.userDetails.id
    this.userDetails.totalBill = this.totalPrice
    this.userService.updateCustomerData(userId, this.userDetails);
    
    this.userService.getApiData().subscribe((data: any) => {
      console.log(data);

      data.forEach((val: any) => {
        if (val.items[0].itemId == item.itemId) {
          // console.log(val.items[0].itemId);
          // console.log(item.itemId);

          this.orderId = val.id;
          this.orderArray.items = [...val.items];
          this.orderArray.id = this.orderId;
          this.orderArray.customerId = val.customerId;
          this.orderArray.totalPrice = val.totalPrice;
          this.orderArray.status = val.status;
          this.orderArray.customization = val.customization;
          val.items[0].ingredients.quantity++;
          this.orderArray.items[0].ingredients = {
            ingredientId: "",
            name: val.items[0].ingredients.name,
            quantity: val.items[0].ingredients.quantity
          }
        }

      });
      console.log(this.orderArray);
      this.userService.updateOrderData(this.orderId, this.orderArray);

      // this.userService.updateOrderData(data[0].id, this.orderArray);
    })

    if (item.quantity <= 0) {
      let id = item.itemId;
      let userId = this.userDetails.id
      // console.log("userID", userId);

      this.cart = this.userArray.filter(item => item.itemId != id)
      // console.log("userArrayBefore", this.userArray);
      this.userArray = this.cart;
      this.userDetails.cart = this.userArray
      // console.log("userArrayAfter", this.userArray);
      this.userService.updateCustomerData(userId, this.userDetails);
    }
  }

  orderId: string = ""
  insertCartItem(item: item) {
    // this.totalPrice += item.price;
    console.log(item);

    // item.quantity++;

    item.quantity += 1;
    this.totalPrice += item.price;

    this.userDetails.totalBill = this.totalPrice

    this.userService.getApiData().subscribe((data: any) => {
      console.log(data);

      data.forEach((val: any) => {
        if (val.items[0].itemId == item.itemId) {
          // console.log(val.items[0].itemId);
          // console.log(item.itemId);

          this.orderId = val.id;
          this.orderArray.items = [...val.items];
          this.orderArray.id = this.orderId;
          this.orderArray.customerId = val.customerId;
          this.orderArray.totalPrice = val.totalPrice;
          this.orderArray.status = val.status;
          this.orderArray.customization = val.customization;
          val.items[0].ingredients.quantity--;
          this.orderArray.items[0].ingredients = {
            ingredientId: "",
            name: val.items[0].ingredients.name,
            quantity: val.items[0].ingredients.quantity
          }
        }

      });
      console.log(this.orderArray);
      this.userService.updateOrderData(this.orderId, this.orderArray);

      // this.userService.updateOrderData(data[0].id, this.orderArray);
    })


    let userId = this.userDetails.id
    this.userService.updateCustomerData(userId, this.userDetails);
  }

  payNow() {
    const RozarpayOptions = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: this.totalPrice * 100,
      name: 'Dj',
      key: 'rzp_test_WyLkfRfd5Xz0yF',
      image: 'https://play-lh.googleusercontent.com/6_Qan3RBgpJUj0C2ct4l0rKKVdiJgF6vy0ctfWyQ7aN0lBjs78M-1cQUONQSVeo2jfs',
      prefill: {
        name: 'sai kumar',
        email: 'sai@gmail.com',
        phone: '9898989898'
      },
      theme: {
        color: '#6466e3'
      },
      modal: {
        ondismiss:  () => {
          console.log('dismissed')
        }
      }
    }

    const successCallback = (paymentid: any) => {
      console.log(paymentid);
    }

    const failureCallback = (e: any) => {
      console.log(e);
    }

    Razorpay.open(RozarpayOptions,successCallback, failureCallback)
  }
  
}
