import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { customer, item, ingredient } from 'src/app/shared/models/user/customerInterface';
import { StaffService } from 'src/app/shared/services/staff/staff.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { staff } from 'src/app/shared/models/staff/staffModel';
@Component({
  selector: 'app-managerdialog',
  templateUrl: './managerdialog.component.html',
  styleUrls: ['./managerdialog.component.scss']
})


export class ManagerdialogComponent {

  eventName: string = "";
  eventId: string = "";

  constructor(
    public dialogRef: MatDialogRef<ManagerdialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private staffService: StaffService, public dialog: MatDialog) {
    this.eventId = data.eventData;
    this.eventName = data.eventName;
    console.log(this.eventId);
    console.log(this.eventName);
    console.log(data);
    
  }

  formData: FormGroup = this.fb.group({
    name: ['']
  })

  staffArray: Array<staff> = []

  customers :  customer = {
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

  staffDetails: staff = {
    id: "",
    name: "",
    email: "",
    password: "",
    role: "",
    shift: "",
    rating: 0,
    customers: []
  }

  onNoClick(): void {
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    this.dialog.closeAll();
  }

  onSubmit() {
    console.log("Onsubmit");

    this.staffService.getStaffData().subscribe((data: any) => {
      this.staffArray.push(data[0])
      // console.log(data[0]);

      const isStaff = data.find((data: any) => {
        return data.id == this.eventId
      })
      console.log(isStaff); //object
      

      if (isStaff && this.eventName == 'schedule') {
        // console.log(this.eventName);

        this.staffDetails.id = isStaff.id
        this.staffDetails.name = isStaff.name
        this.staffDetails.email = isStaff.email
        this.staffDetails.password = isStaff.password
        this.staffDetails.role = isStaff.role
        this.staffDetails.rating = isStaff.rating
        this.staffDetails.shift = this.formData.value.name
        console.log(this.formData.value.name);
        
        this.staffDetails.customers = isStaff.customers

        console.log(this.staffDetails);
        
        this.staffService.updateStaff(isStaff.id, this.staffDetails);
      }
      else if (isStaff && this.eventName.toLocaleLowerCase() == 'rating') {
        this.staffDetails.id = isStaff.id
        this.staffDetails.name = isStaff.name
        this.staffDetails.email = isStaff.email
        this.staffDetails.password = isStaff.password
        this.staffDetails.role = isStaff.role
        this.staffDetails.shift = isStaff.shift
        this.staffDetails.rating = this.formData.value.name
        
        this.staffDetails.customers = isStaff.customers

        this.staffService.updateStaff(isStaff.id, this.staffDetails);
      }
    })
    this.dialog.closeAll();
  }
}
