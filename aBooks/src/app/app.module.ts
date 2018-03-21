import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FrontComponent } from './front/front.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { AdminService } from './admin/admin.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { HttpModule } from '@angular/http';
import { AppService } from './app.service';
import { userAuthService } from './auth/userauth.service';
import { adminAuthService } from './auth/adminauth.service';
import { FlashMessageModule } from 'angular-flash-message';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FrontComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    FormsModule,
    ReactiveFormsModule,
    UserModule,
    HttpModule,
    FlashMessageModule
  ],
  providers: [AdminService,UserService,AppService,userAuthService,adminAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
