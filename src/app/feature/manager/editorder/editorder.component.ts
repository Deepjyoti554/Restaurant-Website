import { Component, OnInit, OnChanges } from '@angular/core';
import { UsercartService } from 'src/app/shared/services/user/usercart.service';
import { order } from 'src/app/shared/models/user/userInterface';
import { customer, item, ingredient } from 'src/app/shared/models/user/customerInterface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editorder',
  templateUrl: './editorder.component.html',
  styleUrls: ['./editorder.component.scss']
})
export class EditorderComponent {
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private userService: UsercartService) { }

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

  apiData: item = {
    itemId: "",
    name: "",
    image: "",
    description: "",
    category: "",
    price: 0,
    rating: 0,
    quantity: 0,
    customization: "",
    ingredients: {
      ingredientId: "",
      name: "",
      quantity: 1
    }
  }

  order!: FormGroup;

  orderId: string = ""
  updateOrderId: string = ""

  isLoading: boolean = true
  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      this.orderId = id!;
      console.log(id);
    });

    this.userService.getOrderedDataById(this.orderId).subscribe((data: any) => {
      console.log(data);
      this.updateOrderId = data.id;

      this.apiData = data.items[0];
      console.log(this.apiData);

      this.initForm();

      // this.order.patchValue({
      //   name: this.apiData.name,
      //   image: this.apiData.image,
      //   description: this.apiData.description,
      //   category: this.apiData.category,
      //   price: this.apiData.price,
      //   rating: this.apiData.rating,
      //   quantity: this.apiData.quantity,
      //   ingredients: null,
      // });
      this.isLoading = false;
    })

  }

  initForm() {
    this.order = this.fb.group({
      name: [this.apiData.name, Validators.required],
      image: [this.apiData.image, Validators.required],
      description: [this.apiData.description, Validators.required],
      category: [this.apiData.category, Validators.required],
      price: [this.apiData.price, Validators.required],
      rating: [this.apiData.rating, Validators.required],
      quantity: [this.apiData.quantity, Validators.required],
      ingredientName: [this.apiData.ingredients.name, Validators.required],
      ingredientQuantity: [this.apiData.ingredients.quantity, Validators.required],
    })
  }

  updateOrder() {
    let id = this.updateOrderId;
    console.log(this.order.value);
    this.orderArray.items.push(this.order.value);
    this.orderArray.id = id;
    this.orderArray.customerId = "";
    this.orderArray.totalPrice = 0;
    this.orderArray.status = "";
    this.orderArray.customization = "";
    this.orderArray.items[0].ingredients = {
      ingredientId: "",
      name: this.order.value.ingredientName,
      quantity: this.order.value.ingredientQuantity
    }

    console.log(this.orderArray);
    this.userService.updateOrderData(id, this.orderArray);
  }

}
