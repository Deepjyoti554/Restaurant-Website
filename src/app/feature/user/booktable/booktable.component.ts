import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsercartService } from 'src/app/shared/services/user/usercart.service';


@Component({
  selector: 'app-booktable',
  templateUrl: './booktable.component.html',
  styleUrls: ['./booktable.component.scss']
})
export class BooktableComponent implements OnInit{
    constructor(private fb: FormBuilder, private userService: UsercartService){}

    ngOnInit(): void {
      this.userService.getTableData().subscribe(data => {
        console.log(data);
      })
    }

    userTable: FormGroup = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      tableNo: ['', Validators.required]
    })

    isBooked = false;
    onSubmit(): void
    {
      console.log(this.userTable.value);
      
      this.userService.getTableData().subscribe(data => {
        let tableNo = data.map((val:any) => {
          if(val.tableNo == this.userTable.value.tableNo)
          {
            this.isBooked = true;
            return;
          }
        })
        if(this.isBooked == true)
        {
          alert("Table has already Booked")
        }
        else{
          this.userService.postTableData(this.userTable.value)
          alert("You have successfully booked the table")
        }
        
      })

      // if(this.us)
      
    }
}
