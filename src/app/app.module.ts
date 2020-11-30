import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './login/auth.service';
import { SaleModule } from './sale/sale.module';
import { NotificationService } from './notification.service';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { MatInputModule } from '@angular/material/input';
import { ClientModule } from './client/client.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import {MatCardModule} from '@angular/material/card';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DialogConfirmComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    ClientModule,
    CategoryModule,
    ProductModule,
    SaleModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    AppRoutingModule
  ],
  providers: [
    NotificationService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
