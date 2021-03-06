import { SharedModule } from './shared/shared.module';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { BasicAuthInterceptor } from './helpers/basic-auth.interceptor';
import { UserModule } from './user/user.module';
import { PurchasesHistoryModule } from './purchases-history/purchases-history.module';
import { RegisterModule } from './register/register.module';
import { CommonUserModule } from './common-user/common-user.module';
import { ShortNamePipe } from './shared/short-name.pipe';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import {MatTooltipModule} from '@angular/material/tooltip';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
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
    CommonUserModule,
    ShoppingCartModule,
    RegisterModule,
    PurchasesHistoryModule,
    UserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatBadgeModule,
    SharedModule,
    MatTooltipModule,
    AppRoutingModule
  ],
  providers: [
    NotificationService,
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
