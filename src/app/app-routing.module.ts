import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { AboutShopComponent } from './pages/about-shop/about-shop.component';
import { TrademarksComponent } from './pages/trademarks/trademarks.component';
import { DeliveryPaymentComponent } from './pages/delivery-payment/delivery-payment.component';
import { GuaranteeComponent } from './pages/guarantee/guarantee.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminSubcategoryComponent } from './admin/admin-subcategory/admin-subcategory.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminTrademarksComponent } from './admin/admin-trademarks/admin-trademarks.component';
import { AdminArchiveComponent } from './admin/admin-archive/admin-archive.component';
import { AdminAddComponent } from './admin/admin-add/admin-add.component';
import { AdminTextPagesComponent } from './admin/admin-text-pages/admin-text-pages.component';
import { AdminBlogComponent } from './admin/admin-blog/admin-blog.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './pages/products/products.component';

import { AuthGuard } from './shared/guards/auth.guard';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { BasketComponent } from './pages/basket/basket.component';
import { AdminSliderComponent } from './admin/admin-slider/admin-slider.component';
import { CompareComponent } from './pages/compare/compare.component';
import { ProfileComponent } from './profile/profile.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutShopComponent },
  { path: 'trademarks', component: TrademarksComponent },
  { path: 'delivery', component: DeliveryPaymentComponent },
  { path: 'guarantee', component: GuaranteeComponent },
  { path: 'discounts', component: DiscountsComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'blogs', component: BlogsComponent },
  { path: 'menu/:category', component: ProductsComponent },
  { path: 'menu/:category/:subcategory', component: ProductsComponent },
  { path: 'menu/:category/:id', component: ProductDetailsComponent },
  { path: 'menu/:category/:subcategory/:id', component: ProductDetailsComponent },
  { path: 'compare', component: CompareComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'orders', pathMatch: 'full' },
      { path: 'category', component: AdminCategoryComponent },
      { path: 'subcategory', component: AdminSubcategoryComponent },
      { path: 'products', component: AdminProductsComponent },
      { path: 'trademarks', component: AdminTrademarksComponent },
      { path: 'orders', component: AdminOrdersComponent },
      { path: 'blog', component: AdminBlogComponent },
      { path: 'slider', component: AdminSliderComponent },
      { path: 'add', component: AdminAddComponent },
      { path: 'archive', component: AdminArchiveComponent },
      { path: 'textPages', component: AdminTextPagesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
