import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsercartService } from 'src/app/shared/services/user/usercart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent{
  constructor(private fb: FormBuilder, private userService: UsercartService, private router: Router){}

    userForm: FormGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    })

    onSubmit(): void
    {
      if (this.userForm.valid)
      {
        console.log(this.userForm.value);
        
        this.userService.postsignUpFormData(this.userForm.value)
        this.router.navigate(["/login"]);
      }
    }
}
