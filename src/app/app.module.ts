import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalModule } from 'ngx-bootstrap/modal';


import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutShopComponent } from './pages/about-shop/about-shop.component';
import { DeliveryPaymentComponent } from './pages/delivery-payment/delivery-payment.component';
import { GuaranteeComponent } from './pages/guarantee/guarantee.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ProfileComponent } from './profile/profile.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { HeadlineComponent } from './components/header/headline/headline.component';
import { TrademarksComponent } from './pages/trademarks/trademarks.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { CompareComponent } from './pages/compare/compare.component';

import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminBlogComponent } from './admin/admin-blog/admin-blog.component';
import { AdminSubcategoryComponent } from './admin/admin-subcategory/admin-subcategory.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminTrademarksComponent } from './admin/admin-trademarks/admin-trademarks.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminArchiveComponent } from './admin/admin-archive/admin-archive.component';
import { AdminAddComponent } from './admin/admin-add/admin-add.component';
import { AdminTextPagesComponent } from './admin/admin-text-pages/admin-text-pages.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { ArrowUpComponent } from './components/arrow-up/arrow-up.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { DividePipe } from './shared/pipes/divide.pipe';
import { SearchPipe } from './shared/pipes/search.pipe';
import { LoginComponent } from './login/login.component';









@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AdminComponent,
    ProfileComponent,
    HomeComponent,
    AboutShopComponent,
    DeliveryPaymentComponent,
    GuaranteeComponent,
    DiscountsComponent,
    ContactsComponent,
    BlogsComponent,
    MainNavComponent,
    BreadcrumbsComponent,
    HeadlineComponent,
    WishlistComponent,
    CompareComponent,
    AdminCategoryComponent,
    AdminBlogComponent,
    AdminSubcategoryComponent,
    AdminOrdersComponent,
    AdminTrademarksComponent,
    TrademarksComponent,
    AdminTrademarksComponent,
    AdminProductsComponent,
    ArrowUpComponent,
    UploadImageComponent,
    DividePipe,
    AdminArchiveComponent,
    AdminAddComponent,
    AdminTextPagesComponent,
    SearchPipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    QuillModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
