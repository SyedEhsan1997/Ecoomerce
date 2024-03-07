import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.css',
})
export class SellerDashboardComponent implements OnInit {
  order_Dashboard_data: any;
  total_Order: any;
  last_Order_date: any;
  product_Dashboard_data: any;
  total_product: number = 0;
  publish_Product: number = 0;
  inactive_Product: number = 0;
  draft_product: number = 0;
  constructor(
    private router: Router,
    private customerService: CustomerService
  ) {}
  ngOnInit(): void {
    this.sellerOrderDashboardData();
    this.sellerProductDashboardData();
  }
  sellerProductDashboard() {
    this.router.navigate(['/seller/product']);
  }
  sellerOrderDashboard() {
    alert('this option is only Vip Canditates');
  }
  sellerOrderDashboardData() {
    this.customerService.orderDashboardData().subscribe(
      (data) => {
        this.order_Dashboard_data = data;
        console.log('Order Dashboard Data', this.order_Dashboard_data);
        this.total_Order = this.order_Dashboard_data.length;
        this.last_Order_date =
          this.order_Dashboard_data[this.total_Order - 1].dateTime;
      },
      (error) => {
        console.log('My error data', error);
      }
    );
  }
  sellerProductDashboardData() {
    this.customerService.productDashboardData().subscribe(
      (data) => {
        this.product_Dashboard_data = data;
        for (status in this.product_Dashboard_data) {
          console.log(this.product_Dashboard_data[status].status);
          if (this.product_Dashboard_data[status].status == 'publish') {
            ++this.publish_Product;
          } else if (this.product_Dashboard_data[status].status == 'inactive') {
            ++this.inactive_Product;
          } else if (this.product_Dashboard_data[status].status == 'draft') {
            ++this.draft_product;
          }
          ++this.total_product;
        }
      },
      (error) => {
        console.log('My error', error);
      }
    );
  }
}
