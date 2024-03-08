import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginSignupService } from '../../shared/services/login-signup.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '../../core/Model/object.model';
@Component({
  selector: 'app-signin-signup',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './signin-signup.component.html',
  styleUrl: './signin-signup.component.css',
})
export class SigninSignupComponent {
  regForm: boolean = true;
  signUpForm!: FormGroup;
  signInForm!: FormGroup;
  signUpsubmitted = false;
  href: string = '';
  user_data: any;
  user_dto!: User;
  user_reg_data: any;
  signInFormValue: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginSignupService
  ) {}
  ngOnInit(): void {
    this.href = this.router.url;
    if (this.href == '/sign-up') {
      this.regForm = true;
    } else if (this.href == '/sign-in') {
      this.regForm = false;
    }
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      addLine1: ['', Validators.required],
      addLine2: [''],
      PhnNumber: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      gender: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      agreetc: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  onSubmitSignUp() {
    this.signUpsubmitted = true;

    if (this.signUpForm.invalid) {
      return;
    }

    const user_reg_data = this.signUpForm.value;
    const user_dto: User = {
      name: user_reg_data.name,
      age: user_reg_data.age,
      dob: user_reg_data.dob,
      email: user_reg_data.email,
      gender: user_reg_data.gender,
      address: {
        id: 0,
        addLine1: user_reg_data.addLine1,
        addLine2: user_reg_data.addLine2,
        country: user_reg_data.country,
        city: user_reg_data.city,
        state: user_reg_data.state,
      },
      phnNumber: user_reg_data.PhnNumber,
      password: user_reg_data.password,
      uploadPhoto: user_reg_data.uploadPhoto,
      agreetc: user_reg_data.agreetc,
      role: user_reg_data.role,
    };

    this.loginService.userRegister(user_dto).subscribe((data: any) => {
      alert('User registered successfully');
      this.router.navigateByUrl('/sign-in');
    });
  }
  onSubmitSignIn() {
    this.loginService
      .authLogin(
        this.signInFormValue.userEmail,
        this.signInFormValue.userPassword
      )
      .subscribe(
        (data) => {
          this.user_data = data;
          if (this.user_data.length === 1) {
            if (this.user_data[0].role === 'Seller') {
              sessionStorage.setItem('user_session_id', this.user_data[0].id);
              sessionStorage.setItem('role', this.user_data[0].role);
              this.router.navigate(['/seller-dashboard']);
            } else if (this.user_data[0].role.toLowerCase() === 'buyer') {
              sessionStorage.setItem('user_session_id', this.user_data[0].id);
              sessionStorage.setItem('role', this.user_data[0].role);
              this.router.navigate(['/buyer-dashboard']);
            } else {
              alert('Invalid login details');
            }
          } else {
            alert('Invalid');
          }
          console.log(this.user_data);
        },
        (error) => {
          console.log('My error', error);
        }
      );
  }
}
