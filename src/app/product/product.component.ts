import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../shared/services/product.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product } from '../core/Model/object.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  all_product_data: any;
  addeditproductform!: FormGroup;
  addEditProduct: boolean = false;
  popup_header!: string;
  add_product!: boolean;
  edit_product!: boolean;
  product_data: any;
  single_product_data: any;
  product_dto!: Product;
  edit_product_id: any;
  constructor(
    private router: Router,
    private productService: ProductService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.addeditproductform = this.fb.group({
      name: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      Description: ['', Validators.required],
      Mrp: ['', Validators.required],
      dp: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.getallProduct();
  }

  get rf() {
    return this.addeditproductform.controls;
  }
  getallProduct() {
    this.productService.allProduct().subscribe(
      (data) => {
        this.all_product_data = data;
        console.log('My All product', this.all_product_data);
      },
      (error) => {
        console.log('My error', error);
      }
    );
  }
  addProductPopup() {
    this.add_product = true;
    this.edit_product = false;
    this.popup_header = 'Add new Product';
    this.addeditproductform.reset();
  }
  addnewProduct() {
    this.edit_product = true;
    if (this.addeditproductform.invalid) {
      return;
    }
    this.product_dto = { ...this.addeditproductform.value }; // Create product DTO from form values
    this.productService.addNewProduct(this.product_dto).subscribe(
      (data) => {
        console.log(data);
        this.getallProduct();
      },
      (error) => {
        console.log('My error', error);
      }
    );
  }

  editProductPopup(id: any) {
    this.add_product = false;
    this.edit_product = true;
    this.popup_header = 'Edit Product';
    this.addeditproductform.reset();

    this.productService.singleProduct(id).subscribe((data) => {
      console.log('Single Data', data); // Log the received data
      this.single_product_data = data; // Assign the received data to this.single_product_data
      this.edit_product_id = data.id;

      // Update the form values using the received data
      this.addeditproductform.setValue({
        name: data.name,
        uploadPhoto: data.uploadPhoto,
        Description: data.Description,
        Mrp: data.Mrp,
        dp: data.dp,
        status: data.status,
      });
    });
  }

  updateProduct() {
    this.addEditProduct = true;
    if (this.addeditproductform.invalid) {
      return;
    }
    this.product_dto = { ...this.addeditproductform.value }; // Create product DTO from form values
    this.productService
      .updateProduct(this.edit_product_id, this.product_dto)
      .subscribe(
        (data) => {
          this.getallProduct();
        },
        (error) => {
          console.log('My error', error);
        }
      );
  }

  deleteProduct(id: any) {
    let conf = confirm('Do you want to delete this product id:' + id);
    if (conf) {
      this.productService.deleteProduct(id).subscribe(
        (data) => {
          console.log('Deleted Successfull', data);
          this.getallProduct();
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      alert('You pressed cancel');
    }
  }
}
