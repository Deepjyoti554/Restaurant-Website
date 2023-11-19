import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const managerGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const user = JSON.parse(localStorage.getItem("localstorage") || "");

  if(user[3] == 'manager'){
    return true;
  }else{
    router.navigate(["/signup"])
    return false;
  }
};
