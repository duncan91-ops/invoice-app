import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from './auth.component'
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { RegisterComponent } from "./register/register.component";
import { ActivateComponent } from "./activate/activate.component";

const routes: Routes = [
  {path: 'auth', component: AuthComponent, children: [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'activate/:uid/:token', component: ActivateComponent},
  ]},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}