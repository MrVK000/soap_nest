import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CartItemPayload, FavoriteItemPayload, LoginUserForm, Message, RegisterUserForm, WishlistItemPayload } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = "http://localhost:5000/api/v1/";
  private registerUserUrl: string = "register";
  private loginUserUrl: string = "login";
  private listProductsUrl: string = "public/product/list";
  private placeholderUrl: string = "public/product/placeholder";
  private getProductByIdUrl: string = "public/product/get/";
  private addReviewUrl: string = "public/review/add";
  private sendMessageUrl: string = "public/message/send";
  private addToCartUrl: string = "cart/add";
  private getCartItemsUrl: string = "cart/";
  private updateCartItemUrl: string = "cart/update";
  private removeCartItemUrl: string = "cart/";
  private addToWishlistUrl: string = "wishlist/add";
  private getWishlistItemsUrl: string = "wishlist/";
  private removeWishlistItemUrl: string = "wishlist/remove";
  private addToFavoriteUrl: string = "favorites/add";
  private getFavoriteItemsUrl: string = "favorites/";
  private removeFavoriteItemUrl: string = "favorites/remove";
  private getOrdersByCustomerIdUrl: string = "orders/user/";
  private getOrderUrl: string = "orders/";
  private makePaymentUrl: string = "payment/make-payment";
  private verifyPaymentUrl: string = "payment/verify-payment";
  private getStatesUrl: string = "public/region/state";
  private getDistrictsByStateUrl: string = "public/region/district/";
  private getPincodesByDistrictUrl: string = "public/region/pincode/";
  private validateCouponUrl: string = "coupon/validate-coupon";
  private suggestionsUrl: string = "suggestions?search=";

  constructor(private http: HttpClient) { }


  fetchSuggestions(searchString: string): Observable<any> {
    if (!searchString) {
      return of([]);
    }
    const url = `${this.baseUrl}${this.suggestionsUrl}${encodeURIComponent(searchString)}`;
    return this.http.get(url);
  }

  registerUser(registerFormPayload: RegisterUserForm) {
    return this.http.post(this.baseUrl.concat(this.registerUserUrl), registerFormPayload);
  }

  loginUser(loginFormPayload: LoginUserForm) {
    return this.http.post(this.baseUrl.concat(this.loginUserUrl), loginFormPayload);
  }

  listProducts(customerId: string): Observable<any> {
    return this.http.post(this.baseUrl.concat(this.listProductsUrl), { customerId });
  }

  fetchPlaceholderWords(): Observable<any> {
    return this.http.get(this.baseUrl.concat(this.placeholderUrl));
  }

  getProductById(productId: string, customerId: string): Observable<any> {
    return this.http.get(((this.baseUrl.concat(this.getProductByIdUrl)).concat(productId)).concat("/" + customerId));
  }

  addReview(reviewForm: any) {
    return this.http.post(this.baseUrl.concat(this.addReviewUrl), reviewForm);
  }

  sendMessage(message: Message) {
    return this.http.post(this.baseUrl.concat(this.sendMessageUrl), message);
  }

  addToCart(cartItemPayload: CartItemPayload) {
    return this.http.post(this.baseUrl.concat(this.addToCartUrl), cartItemPayload);
  }

  getCartItemsByCustomerId(customerId: string) {
    return this.http.get(this.baseUrl.concat(this.getCartItemsUrl).concat(customerId));
  }

  updateCartItem(cartItemPayload: CartItemPayload) {
    return this.http.put(this.baseUrl.concat(this.updateCartItemUrl), cartItemPayload);
  }

  removeCartItem(cartItemId: string) {
    return this.http.delete(this.baseUrl.concat(this.removeCartItemUrl).concat(cartItemId));
  }

  addToWishlist(wishlistItemPayload: WishlistItemPayload) {
    return this.http.post(this.baseUrl.concat(this.addToWishlistUrl), wishlistItemPayload);
  }

  getWishlistItemsByCustomerId(customerId: string) {
    return this.http.get(this.baseUrl.concat(this.getWishlistItemsUrl).concat(customerId));
  }

  removeWishlistItem(id: number) {
    return this.http.post(this.baseUrl.concat(this.removeWishlistItemUrl), { id });
  }

  addToFavorites(favoriteItemPayload: FavoriteItemPayload) {
    return this.http.post(this.baseUrl.concat(this.addToFavoriteUrl), favoriteItemPayload);
  }

  getFavoritesItemsByCustomerId(customerId: string) {
    return this.http.get(this.baseUrl.concat(this.getFavoriteItemsUrl).concat(customerId));
  }

  removeFavoritesItem(id: number) {
    return this.http.post(this.baseUrl.concat(this.removeFavoriteItemUrl), { id });
  }

  getOrdersByCustomerId(customerId: string) {
    return this.http.get(this.baseUrl.concat(this.getOrdersByCustomerIdUrl).concat(customerId));
  }

  getOrder(orderId: string) {
    return this.http.get(this.baseUrl.concat(this.getOrderUrl).concat(orderId));
  }

  makePayment(amount: number) {
    return this.http.post(this.baseUrl.concat(this.makePaymentUrl), { amount });
  }

  verifyPayment(handlerResponse: any) {
    return this.http.post(this.baseUrl.concat(this.verifyPaymentUrl), handlerResponse);
  }

  getStates() {
    return this.http.get(this.baseUrl.concat(this.getStatesUrl));
  }

  getDistrictsByState(state: string) {
    return this.http.get((this.baseUrl.concat(this.getDistrictsByStateUrl)).concat(state));
  }

  getPincodesByDistrict(district: string) {
    return this.http.get((this.baseUrl.concat(this.getPincodesByDistrictUrl)).concat(district));
  }

  validateCouponCode(code: string, cartTotal: number = 1) {
    return this.http.post(this.baseUrl.concat(this.validateCouponUrl), { code, cartTotal });
  }

}
