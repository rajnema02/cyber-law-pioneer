import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { DefaultLayoutComponent } from "./layouts/default-layout/default-layout/default-layout.component";
// import { DefaultLayoutComponent } from "./layouts/default-layout/default-layout/default-layout.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/layouts/admin-layout/admin-layout.module").then(
            (m) => m.AdminLayoutModule
          ),
      },
    ],
  },

  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/layouts/auth-layout/auth-layout.module").then(
            (m) => m.AuthLayoutModule
          ),
      },
    ],
  },
  {
    path: 'exams',
    component: DefaultLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/layouts/default-layout/default-layout/default-layout.module").then(
            (m) => m.DefaultLayoutModule
          ),
      },
    ],
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/layouts/default-layout/default-layout/default-layout.module").then(
            (m) => m.DefaultLayoutModule
          ),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "dashboard",
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}
