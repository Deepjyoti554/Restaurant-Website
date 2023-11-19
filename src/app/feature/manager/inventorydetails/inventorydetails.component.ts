import { Component, OnInit, OnChanges } from '@angular/core';
import { UsercartService } from 'src/app/shared/services/user/usercart.service';
import { order } from 'src/app/shared/models/user/userInterface';
import { customer, item, ingredient } from 'src/app/shared/models/user/customerInterface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inventorydetails',
  templateUrl: './inventorydetails.component.html',
  styleUrls: ['./inventorydetails.component.scss']
})
export class InventorydetailsComponent {
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private userService: UsercartService) { }

  
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
  
  product: order = {
    id: "",
    customerId: "",
    items: [],
    totalPrice: 1,
    status: "",
    customization: ""
  }

  orderId: string = ""

  isLoading: boolean = true
  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      this.orderId = id!;
      console.log(id);
    });

    this.userService.getOrderedDataById(this.orderId).subscribe((data: any) => {
      console.log(data);
      this.product = data
      console.log(this.product);
    })

  }

}
