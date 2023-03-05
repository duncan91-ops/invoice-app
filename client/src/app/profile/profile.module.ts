import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';



@NgModule({
  declarations: [
    ProfileComponent,
    ProfileDetailComponent,
    ProfileEditComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProfileModule { }
