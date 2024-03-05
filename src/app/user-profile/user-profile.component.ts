import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../core/Model/object.model';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  userProfileForm!: FormGroup;
  userProfile: boolean = false;
  user_id!: any;
  user_data: any;
  user_update_data: any;
  user_dto!: User;
  user_profile_pic: any;
  user_role: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private user_Service: UserService
  ) {}
  ngOnInit(): void {
    this.user_id = sessionStorage.getItem('user_session_id');
    console.log(this.user_id);

    this.userProfileForm = this.formBuilder.group({
      name: ['', Validators.required],
      PhnNumber: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      addLine1: ['', Validators.required],
      addLine2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      gender: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      role: [''],
    });
    this.edituserData(this.user_id);
  }
  get rf() {
    return this.userProfileForm.controls;
  }
  edituserData(user_id: any) {
    this.user_Service.getUserData(user_id).subscribe(
      (data) => {
        this.user_data = data;
        this.user_profile_pic = this.user_data.uploadPhoto;
        this.user_role = this.user_data.role;
        this.userProfileForm.setValue({
          name: this.user_data.name,
          PhnNumber: this.user_data.phnNumber,
          age: this.user_data.age,
          dob: this.user_data.dob,
          email: this.user_data.email,
          password: this.user_data.password,
          gender: this.user_data.gender,
          addLine1: this.user_data.address.addLine1,
          addLine2: this.user_data.address.addLine2,
          city: this.user_data.address.city,
          state: this.user_data.address.state,
          uploadPhoto: '',
          role: this.user_data.role,
        });
      },
      (error) => {
        console.log('My error', error);
      }
    );
  }
  updateProfile() {
    this.userProfile = true;
    if (this.userProfileForm.invalid) {
      return;
    }
    this.user_update_data = this.userProfileForm.value;
    this.user_dto = {
      name: this.user_update_data.name,
      age: this.user_update_data.age,
      dob: this.user_update_data.dob,
      email: this.user_update_data.email,
      gender: this.user_update_data.gender,
      address: {
        id: 0,
        addLine1: this.user_update_data.addLine1,
        addLine2: this.user_update_data.addLine2,
        country: this.user_update_data.country,
        city: this.user_update_data.city,
        state: this.user_update_data.state,
      },
      phnNumber: this.user_update_data.PhnNumber,
      password: this.user_update_data.password,
      uploadPhoto:
        this.user_update_data.uploadPhoto == ''
          ? this.user_profile_pic
          : this.user_update_data.uploadPhoto,
      agreetc: this.user_update_data.agreetc,
      role: this.user_update_data.role,
    };
    console.log(this.user_dto);

    this.user_Service.updateUserData(this.user_id, this.user_dto).subscribe(
      (data) => {
        alert('Profile Update Sucessfully !');
        if (this.user_role == 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else if (this.user_role == 'Seller') {
          this.router.navigate(['/seller-dashboard']);
        } else if (this.user_role == 'buyer') {
          this.router.navigate(['/buyer-dashboard']);
        }
      },
      (error) => {
        console.log('My Error', error);
      }
    );
  }
}
