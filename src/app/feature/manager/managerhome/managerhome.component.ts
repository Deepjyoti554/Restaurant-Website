import { Component, OnInit, OnChanges } from '@angular/core';
import { UsercartService } from 'src/app/shared/services/user/usercart.service';
import { order } from 'src/app/shared/models/user/userInterface';
import { customer, item, ingredient } from 'src/app/shared/models/user/customerInterface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managerhome',
  templateUrl: './managerhome.component.html',
  styleUrls: ['./managerhome.component.scss']
})
export class ManagerhomeComponent {
  constructor(private router: Router, private fb: FormBuilder, private cartService: UsercartService) { }

  productArray: Array<order> = []

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

    //update order
    orderArray: order = {
      id: "",
      customerId: "",
      items: [],
      totalPrice: 1,
      status: "",
      customization: ""
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

  addToOrder() {
    this.router.navigate(['/addorder']);
  }

  deleteToOrder(order: order) {
    let id = order.id;
    console.log(id);
    
    this.cartService.deleteOrder(id);
    this.router.navigate(['/managerhome']);
  }

  editToOrder(item : order)
  {
    window.location.href = '/editorder?id=' + item.id;
    // this.router.navigate(['/editorder']);
  }
  
  viewProduct(item : order)
  {
    window.location.href = '/inventorydetails?id=' + item.id;
  }

  restock(item : order)
  {
    console.log(item);
    
    this.cartService.getApiData().subscribe((data: any) => {
      console.log(data);

      data.forEach((val: any) => {
        if (val.id == item.id) {
          // console.log(val.items[0].itemId);
          // console.log(item.itemId);

          this.orderArray.items.push(val.items[0]);
          this.orderArray.id = item.id;
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
      this.cartService.updateOrderData(item.id, this.orderArray);
      alert("You have successfully added the item");
    })
  }
}
