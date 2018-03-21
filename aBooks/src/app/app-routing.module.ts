import { NgModule } from "@angular/core";
import { Routes,RouterModule, PreloadAllModules } from "@angular/router";
import { FrontComponent } from "./front/front.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { userAuthService } from "./auth/userauth.service";
import { adminAuthService } from "./auth/adminauth.service";



const appRoutes : Routes = [
    { path: '', component: FrontComponent ,pathMatch:'full'},
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'user',loadChildren:'./user/user.module#UserModule',canActivate:[userAuthService]},
    {path: 'admin', loadChildren:'./admin/admin.module#AdminModule',canActivate:[adminAuthService]},


];


@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
    providers: [adminAuthService]
})
export class AppRoutingModule {

}