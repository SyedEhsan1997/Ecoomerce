import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-buyer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './buyer-dashboard.component.html',
  styleUrl: './buyer-dashboard.component.css',
})
export class BuyerDashboardComponent implements OnInit {
  checkoutForm: any;
  submitCheckoutForm() {
    throw new Error('Method not implemented.');
  }
  all_product: any;
  show_checkout: boolean = false;
  constructor(
    private router: Router,
    private customerService: CustomerService
  ) {}
  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct() {
    this.customerService.allProduct().subscribe(
      (data) => {
        this.all_product = data;
        // console.log(this.all_product);
      },
      (error) => {
        console.log('My error', error);
      }
    );
  }
  buyProduct(id: number) {
    this.show_checkout = true;
    this.customerService.quickBuyProduct(id);
    this.router.navigate(['/checkout'],{queryParams:{productid:id}});
  }
  addToCart() {
    alert('This is ShowCase');
  }
}
