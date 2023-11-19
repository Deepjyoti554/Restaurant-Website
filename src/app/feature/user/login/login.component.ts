import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsercartService } from 'src/app/shared/services/user/usercart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private userService: UsercartService, private router: Router) { }

  hasRouted = false;
  hasRouted1 = false;
  hasRouted2 = false;
  hasRouted3 = false;


  loginForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    role: ['']
  })

  localstorage: Array<string> = []

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.userService.getCustomerData().subscribe((data: any) => {
        console.log(data);

        const match = data.find((customer: any) => {

          const name = customer.name;
          const email = customer.email;
          const password = customer.password;
          const role = customer.role;

          return name == this.loginForm.value.name && email == this.loginForm.value.email
            && password == this.loginForm.value.password;
        });

        if (match && match.role == "customer") {
          console.log(match.role);

          // if (match.role == "customer") {
          this.localstorage.push(this.loginForm.value.name);
          this.localstorage.push(this.loginForm.value.email);
          this.localstorage.push(this.loginForm.value.password);
          this.localstorage.push(match.role);
          console.log("localstorage", this.localstorage);

          localStorage.setItem('localstorage', JSON.stringify(this.localstorage));
          this.router.navigate(["/cart"]);
          // }
        } else {
          // alert("You have not registered yet!!!!!!!!!!!!");
          // this.router.navigate(["/signup"]);
          this.userService.getStaffData().subscribe((data: any) => {
            console.log(data);

            const match = data.find((customer: any) => {

              const name = customer.name;
              const email = customer.email;
              const password = customer.password;
              const role = customer.role;

              return name == this.loginForm.value.name && email == this.loginForm.value.email
                && password == this.loginForm.value.password;
            });

            if (match && match.role == "staff") {
              console.log(match.role);

              // if (match.role == "manager") {
              this.localstorage.push(this.loginForm.value.name);
              this.localstorage.push(this.loginForm.value.email);
              this.localstorage.push(this.loginForm.value.password);
              this.localstorage.push(match.role);
              console.log("localstorage", this.localstorage);

              localStorage.setItem('localstorage', JSON.stringify(this.localstorage));
              this.router.navigate(["/staffhome"]);
              // }

            }
            else {
              // alert("You have not registered yet!!!!!!!!!!!!");
              // this.router.navigate(["/signup"]);
              this.userService.getManagerData().subscribe((data: any) => {
                console.log(data);

                const match = data.find((customer: any) => {

                  const name = customer.name;
                  const email = customer.email;
                  const password = customer.password;
                  const role = customer.role;

                  return name == this.loginForm.value.name && email == this.loginForm.value.email
                    && password == this.loginForm.value.password;
                });

                if (match && match.role == "manager") {
                  console.log(match.role);

                  // if (match.role == "manager") {
                  this.localstorage.push(this.loginForm.value.name);
                  this.localstorage.push(this.loginForm.value.email);
                  this.localstorage.push(this.loginForm.value.password);
                  this.localstorage.push(match.role);
                  console.log("localstorage", this.localstorage);

                  localStorage.setItem('localstorage', JSON.stringify(this.localstorage));
                  this.router.navigate(["/managerhome"]);
                  // }

                }
                else {
                  alert("You have not registered yet!!!!!!!!!!!!");
                  this.router.navigate(["/signup"]);
                }
              });
            }
          });
        }
      });







    }
  }
}
