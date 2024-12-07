import { Routes } from "@angular/router";

export const routes: Routes = [
  {
   path: "",
   loadChildren:()=> import ('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: "home-page",
    loadChildren: () =>
      import("./home-page/home-page.component").then(
        (m) => m.HomePageComponent
      ),
  },
  {
    path: "signup",
    loadChildren: () =>
      import("./signup/signup.component").then((m) => m.SignupComponent),
  },
];
