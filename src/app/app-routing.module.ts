import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserhomeComponent } from './feature/user/userHome/userhome.component';
import { HomeComponent } from './shared/components/home/home/home.component';
import { BooktableComponent } from './feature/user/booktable/booktable.component';
import { SignupComponent } from './feature/user/signup/signup.component';
import { LoginComponent } from './feature/user/login/login.component';
import { UsercartComponent } from './feature/user/usercart/usercart.component';
import { CartComponent } from './feature/user/cart/cart.component';
import { ManagerhomeComponent } from './feature/manager/managerhome/managerhome.component';
import { AddorderComponent } from './feature/manager/addorder/addorder.component';
import { EditorderComponent } from './feature/manager/editorder/editorder.component';
import { StaffhomeComponent } from './feature/staff/staffhome/staffhome.component';
import { staffGuard } from './feature/staff/staffhome/staff.guard';
import { customerGuard } from './feature/user/cart/customer.guard';
import { managerGuard } from './feature/manager/managerhome/manager.guard';
import { EditstaffdetailsComponent } from './feature/manager/editstaffdetails/editstaffdetails.component';
import { CategoryitemsComponent } from './feature/user/categoryitems/categoryitems.component';
import { StaffdetailsComponent } from './feature/staff/staffdetails/staffdetails.component';
import { InventorydetailsComponent } from './feature/manager/inventorydetails/inventorydetails.component';
import { SalereportComponent } from './feature/manager/salereport/salereport.component';
// import { AuthGuard } from './shared/AuthGaurd/AuthGaurd';

const routes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full' },
  // { path: '', component: HomeComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'signup', component: SignupComponent },
  // { path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
  // { path: 'staff', component: StaffhomeComponent, canActivate: [AuthGuard]},
  // { path: 'managerhome', component: ManagerhomeComponent, canActivate: [AuthGuard]},
  // { path: '**', redirectTo: '/' }

  {
    path: "",
    component: HomeComponent
  },
  {
    path: "userhome",
    component: UserhomeComponent
  },
  {
    path: "booktable",
    component: BooktableComponent,
    canActivate: [customerGuard]
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "usercart",
    component: UsercartComponent
  },
  {
    path: "cart",
    component: CartComponent,
    canActivate:[customerGuard]
  },
  {
    path: "managerhome",
    component: ManagerhomeComponent,
    canActivate: [managerGuard]
  },
  {
    path: "addorder",
    component: AddorderComponent,
    canActivate: [managerGuard]
  },
  {
    path: "editorder",
    component: EditorderComponent,
    canActivate: [managerGuard]
  },
  {
    path: "staffhome",
    component: StaffhomeComponent,
    canActivate : [staffGuard]  
  },
  {
    path: "editstaffdetails",
    component: EditstaffdetailsComponent,
    canActivate: [managerGuard]
  },
  {
    path: "categoryitems",
    component: CategoryitemsComponent,
    canActivate:[customerGuard]
  },
  {
    path: "staffdetails",
    component: StaffdetailsComponent,
    canActivate : [staffGuard]  
  },
  {
    path: "inventorydetails",
    component: InventorydetailsComponent,
    canActivate: [managerGuard]
  },
  {
    path: "salereport",
    component: SalereportComponent,
    canActivate: [managerGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
