import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ImagesComponent } from './pages/images/images.component';
import { EditImageComponent } from './pages/edit-image/edit-image.component';
import { UserTypeService } from './services/user-type.service';
import { UserImagesComponent } from './pages/user-images/user-images.component';

const routes: Routes = [
  {path: '', component: ImagesComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'images/new',
    component: EditImageComponent,
    canActivate: [UserTypeService],
    data: {userType: ['user']},
  },
  {path: 'users/:id', component: UserImagesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
