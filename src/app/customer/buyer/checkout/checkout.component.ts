import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product, User, order } from '../../../core/Model/object.model';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  single_product_id: any;
  user_id: any;
  individual_product!: Product;
  user_detail!: User;
  order_dto!: order;
  user_address: any;
  user_contact_no: any;
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.customerService.currentProduct.subscribe(
      (product) => (this.single_product_id = product)
    );
    this.user_id = sessionStorage.getItem('user_session_id');
    this.productDetail();
    this.userAddress(this.user_id);
  }

  async productDetail() {
    console.log();
    const id = await this.addParams();

    this.customerService.individualProduct(this.single_product_id).subscribe(
      (data) => {
        this.individual_product = data;
        console.log('my sigle product', this.individual_product);
      },
      (error) => {
        console.log('My error', error);
      }
    );
  }
  userAddress(user_id: any) {
    this.customerService.userDetail(user_id).subscribe(
      (data) => {
        this.user_address = data.address;
        this.user_contact_no = data.phnNumber;
      },
      (error) => {
        console.log('My error', error);
      }
    );
  }
  placeOrder() {
    this.order_dto = {
      id: 0,
      userId: this.user_id,
      sellerId: 2,
      product: {
        id: this.individual_product.id,
        name: this.individual_product.name,
        uploadPhoto: this.individual_product.uploadPhoto,
        Description: this.individual_product.Description,
        Mrp: this.individual_product.Mrp,
        dp: this.individual_product.dp,
        status: this.individual_product.status,
      },
      deliveryAddress: {
        id: 0,
        addLine1: this.user_address.addLine1,
        addLine2: this.user_address.addLine2,
        city: this.user_address.city,
        state: this.user_address.state,
        country: this.user_address.country,
      },
      contact: this.user_contact_no,
      dateTime: new Date().toLocaleDateString(),
    };
    console.log('Place Order DTL', this.order_dto);
    this.customerService.insertNewOrder(this.order_dto).subscribe(
      (data) => {
        this.router.navigate(['/buyer-dashboard']);
      },
      (error) => {
        console.log('My error', error);
      }
    );
  }
  addParams() {
    this.route.queryParams.subscribe((params) => {
      this.single_product_id = params['productid'];

      // Call methods here that depend on single_product_id
    });
  }
}
