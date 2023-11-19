import { Component,ViewChild, OnInit } from '@angular/core';
import { customer, item, ingredient } from 'src/app/shared/models/user/customerInterface';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { StaffService } from 'src/app/shared/services/staff/staff.service';
import { ManagerdialogComponent } from '../managerdialog/managerdialog.component';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogConfig,
} from '@angular/material/dialog';

@Component({
  selector: 'app-editstaffdetails',
  templateUrl: './editstaffdetails.component.html',
  styleUrls: ['./editstaffdetails.component.scss']
})

// export interface DialogData {
//   animal: string;
//   name: string;
// }

export class EditstaffdetailsComponent  implements OnInit{  
  dataSource: any;
  displayedColumns: string[] = ["id", "name", "email", "action"];
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(private staffService: StaffService,  public dialog: MatDialog) {
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(ManagerdialogComponent, {
      data: {},
    });
  }

  ngOnInit(): void {
    this.staffService.getStaffData().subscribe((data: any) =>{
      this.dataSource = data
      console.log(this.dataSource);
      
    })
  }

  getID(id: Number): void{
    
  }
  
  scheduleStaff(id: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { 
      eventName: "schedule", 
      eventData: id
    };
    this.dialog.open(ManagerdialogComponent, dialogConfig);
  }

  giveRating(id: number): void
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { 
      eventName: "rating", 
      eventData: id
    };
    this.dialog.open(ManagerdialogComponent, dialogConfig);
  }
}
