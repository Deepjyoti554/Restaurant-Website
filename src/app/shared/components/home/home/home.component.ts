import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private router: Router){}
  appetizer()
  {
    window.location.href = '/categoryitems?id=' + 'appetizer';
  }

  maincourse()
  {
    window.location.href = '/categoryitems?id=' + 'maincourse';
  }

  dessert()
  {
    window.location.href = '/categoryitems?id=' + 'dessert';
  }

  baverages()
  {
    window.location.href = '/categoryitems?id=' + 'baverages';
  }

  bookTable()
  {
    if (localStorage.getItem('localstorage')) {
      this.router.navigate(["/booktable"]);
    } else {
      alert("You need to signup first to book table")
    }
  }
}
