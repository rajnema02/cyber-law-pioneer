import { Routes } from "@angular/router";

import { LoginComponent } from "../../pages/login/login.component";
import { RegisterComponent } from "../../pages/register/register.component";
import { AdminLoginComponent } from "src/app/pages/admin-login/admin-login.component";
import { ForgetPasswordComponent } from "src/app/pages/forget-password/forget-password.component";
import { VerifyCandicateComponent } from "src/app/pages/verify-candicate/verify-candicate.component";
import { CenterRegistrationComponent } from "src/app/pages/center-registration/center-registration.component";


export const AuthLayoutRoutes: Routes = [

  { path: "login", component: LoginComponent },
  { path: "admin", component: AdminLoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "forget-password", component: ForgetPasswordComponent },
  { path: "verify-candidate/:id", component: VerifyCandicateComponent },
  { path: "register/center-registration", component: CenterRegistrationComponent}
];
