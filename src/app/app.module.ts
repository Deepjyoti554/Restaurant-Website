import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsernavbarComponent } from './shared/components/usernavbar/usernavbar.component';
import { HomeComponent } from './shared/components/home/home/home.component';
import { UserhomeComponent } from './feature/user/userHome/userhome.component';
import { CartComponent } from './feature/user/cart/cart.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BooktableComponent } from './feature/user/booktable/booktable.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './feature/user/signup/signup.component';
import { LoginComponent } from './feature/user/login/login.component';
import { UsercartComponent } from './feature/user/usercart/usercart.component';
import { HomenavbarComponent } from './shared/components/homenavbar/homenavbar.component';
import { ManagerhomeComponent } from './feature/manager/managerhome/managerhome.component';
import { ManagersidebarComponent } from './feature/manager/managersidebar/managersidebar.component';
import { ManagernavbarComponent } from './feature/manager/managernavbar/managernavbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { ManagercardComponent } from './feature/manager/managercard/managercard.component';
import { AddorderComponent } from './feature/manager/addorder/addorder.component';
import { EditorderComponent } from './feature/manager/editorder/editorder.component';
import { LoaderComponent } from './feature/user/loader/loader.component';
import { StaffhomeComponent } from './feature/staff/staffhome/staffhome.component';
import { StaffsidebarComponent } from './feature/staff/staffsidebar/staffsidebar.component';
import { StaffnavbarComponent } from './feature/staff/staffnavbar/staffnavbar.component';
import { EditstaffdetailsComponent } from './feature/manager/editstaffdetails/editstaffdetails.component';
import { CategoryitemsComponent } from './feature/user/categoryitems/categoryitems.component';
import { MaterialModule } from './meterial/material.module';
import { UserdialogComponent } from './feature/user/userdialog/userdialog.component';
import { StaffdetailsComponent } from './feature/staff/staffdetails/staffdetails.component';
import { ManagerdialogComponent } from './feature/manager/managerdialog/managerdialog.component';
import { InventorydetailsComponent } from './feature/manager/inventorydetails/inventorydetails.component';
import { SalereportComponent } from './feature/manager/salereport/salereport.component';


@NgModule({
  declarations: [
    AppComponent,
    UsernavbarComponent,
    HomeComponent,
    UserhomeComponent,
    CartComponent,
    BooktableComponent,
    SignupComponent,
    LoginComponent,
    UsercartComponent,
    HomenavbarComponent,
    ManagerhomeComponent,
    ManagersidebarComponent,
    ManagernavbarComponent,
    ManagercardComponent,
    AddorderComponent,
    EditorderComponent,
    LoaderComponent,
    StaffhomeComponent,
    StaffsidebarComponent,
    StaffnavbarComponent,
    EditstaffdetailsComponent,
    CategoryitemsComponent,
    UserdialogComponent,
    StaffdetailsComponent,
    ManagerdialogComponent,
    InventorydetailsComponent,
    SalereportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
