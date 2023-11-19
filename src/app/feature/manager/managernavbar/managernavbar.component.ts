import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managernavbar',
  templateUrl: './managernavbar.component.html',
  styleUrls: ['./managernavbar.component.scss']
})
export class ManagernavbarComponent {
  constructor(private router: Router){}

  logOut() {
    console.log("delete");

    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
