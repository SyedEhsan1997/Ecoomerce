import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

//admin before login check
@Injectable({
  providedIn: 'root',
})
export class AdminAuthGaurdLogin implements CanActivate {
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let role = sessionStorage.getItem('role');
    if (role == 'admin') {
      this.router.navigate(['/admin-dashboard']);
      return false;
    } else {
      return true;
    }
  }
}

//admin after login check
@Injectable({
  providedIn: 'root',
})
export class AdminAuthGaurdService {
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let role = sessionStorage.getItem('role');
    if (role == 'admin') {
      return true;
    } else {
      this.router.navigate(['/admin-login']);
      return false;
    }
  }
}
//Customer (Buyer & Seller) before login check
@Injectable({
  providedIn: 'root',
})
export class SellerBuyerAuthGuardLogin implements CanActivate {
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let role = sessionStorage.getItem('role');
    if (role == 'Seller') {
      this.router.navigate(['/seller-dashboard']);
      return false;
    } else if (role == 'buyer') {
      this.router.navigate(['/buyer-dashboard']);
      return false;
    } else {
      return true;
    }
  }
}

//Buyer after login check
@Injectable({
  providedIn: 'root',
})
export class BuyerAuthGaurdService {
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let role = sessionStorage.getItem('role');
    if (role == 'buyer') {
      return true;
    } else {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}
//seller after login check
@Injectable({
  providedIn: 'root',
})
export class SellerAuthGaurdService {
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let role = sessionStorage.getItem('role');
    if (role == 'Seller') {
      return true;
    } else {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}
