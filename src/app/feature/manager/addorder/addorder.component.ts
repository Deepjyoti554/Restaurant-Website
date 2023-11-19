import { Component, OnInit, OnChanges } from '@angular/core';
import { UsercartService } from 'src/app/shared/services/user/usercart.service';
import { order } from 'src/app/shared/models/user/userInterface';
import { customer, item, ingredient } from 'src/app/shared/models/user/customerInterface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-addorder',
  templateUrl: './addorder.component.html',
  styleUrls: ['./addorder.component.scss']
})
export class AddorderComponent {
  constructor(private fb: FormBuilder, private userService: UsercartService) { }

  orderArray: order = {
      id: "",
      customerId: "",
      items: [],
      totalPrice: 1,
      status: "",
      customization: ""
  }

  ingredientObject :  ingredient = {
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
    ingredients : this.ingredientObject
  }

  order: FormGroup = this.fb.group({
    name: ['', Validators.required],
    image: ['', Validators.required],
    description: ['', Validators.required],
    category: ['', Validators.required],
    price: ['', Validators.required],
    rating: ['', Validators.required],
    quantity: ['', Validators.required],
    ingredientName: ['', Validators.required],
    ingredientQuantity: ['', Validators.required],
  })


  onSubmit()
  {
    this.itemObject.name = this.order.value.name
    this.itemObject.image = this.order.value.image
    this.itemObject.description = this.order.value.description
    this.itemObject.category = this.order.value.category
    this.itemObject.price = this.order.value.price
    this.itemObject.rating = this.order.value.rating
    this.itemObject.quantity = this.order.value.quantity
    this.itemObject.ingredients.name = this.order.value.ingredientName
    this.itemObject.ingredients.name = this.order.value.ingredientQuantity

    this.orderArray.items.push(this.itemObject)
    console.log(this.orderArray);
    
    this.userService.postOrderData(this.orderArray)
  }
}
