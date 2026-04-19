import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  CartItemsResponse,
  CartItemPayload,
  CartSummaryResponse,
  CouponValidationResponse,
  FavoriteItemPayload,
  LoginUserForm,
  Message,
  OrdersResponse,
  OrderDetailsResponse,
  ProductListResponse,
  RegisterUserForm,
  SuggestionsResponse,
  WishlistItemsResponse,
  WishlistItemPayload
} from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly baseUrl: string = environment.apiBaseUrl;
  private registerUserUrl: string = "register";
  private loginUserUrl: string = "login";
  private authRefreshUrl: string = "auth/refresh";
  private authLogoutUrl: string = "auth/logout";
  private forgotPasswordUrl: string = "password/forgot-password";
  private resetPasswordUrl: string = "password/reset-password";
  private listProductsUrl: string = "public/product/list";
  private placeholderUrl: string = "public/product/placeholder";
  private getProductByIdUrl: string = "public/product/get/";
  private addReviewUrl: string = "public/review/add";
  private sendMessageUrl: string = "public/message/send";
  private addToCartUrl: string = "cart/add";
  private getCartSummaryUrl: string = "cart/summary/";
  private getCartCountUrl: string = "cart/count/";
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
  private updateProfileUrl: string = "user/update-profile/";
  private updatePasswordUrl: string = "user/update-password/";
  private makePaymentUrl: string = "payment/make-payment";
  private verifyPaymentUrl: string = "payment/verify-payment";
  private validateCouponUrl: string = "coupon/validate-coupon";
  private suggestionsUrl: string = "suggestions?search=";
  private getTopReviewsUrl: string = "public/review/top";
  private getReviewsByProductIdUrl: string = "public/review/product/";
  private getPublicFeaturedProductsUrl: string = "public/product/public/featured";

  constructor(private http: HttpClient) { }

  private getCookieValue(name: string): string {
    // document.cookie is only readable for cookies that are not httpOnly.
    const parts = document.cookie ? document.cookie.split(';') : [];
    const match = parts.map((p) => p.trim()).find((p) => p.startsWith(`${name}=`));
    if (!match) return '';
    return decodeURIComponent(match.split('=').slice(1).join('='));
  }


  fetchSuggestions(searchString: string): Observable<SuggestionsResponse> {
    if (!searchString?.trim()) {
      return of({ data: [] });
    }

    const url = `${this.baseUrl}${this.suggestionsUrl}${encodeURIComponent(searchString)}`;
    return this.http.get<SuggestionsResponse>(url);
  }

  registerUser(registerFormPayload: RegisterUserForm) {
    // Backend returns { message, user, token } on success.
    return this.http.post<{ message: string; user: any; token: string }>(
      this.baseUrl.concat(this.registerUserUrl),
      registerFormPayload,
      { withCredentials: true }
    );
  }

  loginUser(loginFormPayload: LoginUserForm) {
    return this.http.post<{ message: string; user: any; token: string }>(
      this.baseUrl.concat(this.loginUserUrl),
      loginFormPayload,
      { withCredentials: true }
    );
  }

  refreshSession() {
    // Refresh token is stored server-side in an httpOnly cookie.
    const csrfToken = this.getCookieValue('csrfToken');
    return this.http.post(
      this.baseUrl.concat(this.authRefreshUrl),
      {},
      {
        withCredentials: true,
        headers: new HttpHeaders({
          'x-csrf-token': csrfToken,
        }),
      }
    );
  }

  logout() {
    const csrfToken = this.getCookieValue('csrfToken');
    return this.http.post(
      this.baseUrl.concat(this.authLogoutUrl),
      {},
      {
        withCredentials: true,
        headers: new HttpHeaders({
          'x-csrf-token': csrfToken,
        }),
      }
    );
  }

  forgotPassword(email: string) {
    return this.http.post(this.baseUrl.concat(this.forgotPasswordUrl), { email });
  }

  resetPassword(token: string, newPassword: string) {
    return this.http.post(this.baseUrl.concat(this.resetPasswordUrl), { token, newPassword });
  }

  listProducts(customerId: string, page: number = 1, filters: { search?: string, category?: string, minPrice?: number, maxPrice?: number } = {}): Observable<ProductListResponse> {
    let params = `page=${page}&limit=10&customerId=${customerId}`;
    if (filters.search) params += `&search=${encodeURIComponent(filters.search)}`;
    if (filters.category) params += `&category=${encodeURIComponent(filters.category)}`;
    if (filters.minPrice !== undefined) params += `&minPrice=${filters.minPrice}`;
    if (filters.maxPrice !== undefined) params += `&maxPrice=${filters.maxPrice}`;
    return this.http.get<ProductListResponse>(`${this.baseUrl}${this.listProductsUrl}?${params}`);
  }

  fetchPlaceholderWords(): Observable<any> {
    return this.http.get<any>(this.baseUrl.concat(this.placeholderUrl));
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

  getCartCount(customerId: string): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.baseUrl}${this.getCartCountUrl}${customerId}`);
  }

  getCartItemsByCustomerId(customerId: string, page: number = 1, limit: number = 6): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${this.getCartItemsUrl}${customerId}?page=${page}&limit=${limit}`);
  }

  getCartSummary(customerId: string): Observable<CartSummaryResponse> {
    return this.http.get<CartSummaryResponse>(`${this.baseUrl}${this.getCartSummaryUrl}${customerId}`);
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

  getWishlistItemsByCustomerId(customerId: string, page: number = 1, limit: number = 6): Observable<WishlistItemsResponse> {
    return this.http.get<WishlistItemsResponse>(`${this.baseUrl}${this.getWishlistItemsUrl}${customerId}?page=${page}&limit=${limit}`);
  }

  removeWishlistItem(id: number) {
    return this.http.post(this.baseUrl.concat(this.removeWishlistItemUrl), { id });
  }

  addToFavorites(favoriteItemPayload: FavoriteItemPayload) {
    return this.http.post(this.baseUrl.concat(this.addToFavoriteUrl), favoriteItemPayload);
  }

  getFavoritesItemsByCustomerId(customerId: string, page: number = 1, limit: number = 6): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${this.getFavoriteItemsUrl}${customerId}?page=${page}&limit=${limit}`);
  }

  removeFavoritesItem(id: number) {
    return this.http.post(this.baseUrl.concat(this.removeFavoriteItemUrl), { id });
  }

  getOrdersByCustomerId(customerId: string, page: number = 1, limit: number = 6): Observable<OrdersResponse> {
    return this.http.get<OrdersResponse>(`${this.baseUrl}${this.getOrdersByCustomerIdUrl}${customerId}?page=${page}&limit=${limit}`);
  }

  updateProfile(customerId: string, payload: { name: string; phone: string; address: string }) {
    return this.http.put(`${this.baseUrl}${this.updateProfileUrl}${customerId}`, payload);
  }

  updatePassword(customerId: string, payload: { oldPassword: string; newPassword: string }) {
    return this.http.put(`${this.baseUrl}${this.updatePasswordUrl}${customerId}`, payload);
  }

  getOrder(orderId: string): Observable<OrderDetailsResponse> {
    return this.http.get<OrderDetailsResponse>(this.baseUrl.concat(this.getOrderUrl).concat(orderId));
  }

  makePayment(amount: number) {
    return this.http.post(this.baseUrl.concat(this.makePaymentUrl), { amount });
  }

  verifyPayment(handlerResponse: any) {
    return this.http.post(this.baseUrl.concat(this.verifyPaymentUrl), handlerResponse);
  }

  validateCouponCode(code: string, cartTotal: number = 1): Observable<CouponValidationResponse> {
    return this.http.post<CouponValidationResponse>(this.baseUrl.concat(this.validateCouponUrl), { code, cartTotal });
  }

  getTopReviews(): Observable<any> {
    return this.http.get<any>(this.baseUrl.concat(this.getTopReviewsUrl));
  }

  getReviewsByProductId(productId: string, page: number = 1, limit: number = 6): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${this.getReviewsByProductIdUrl}${productId}?page=${page}&limit=${limit}`);
  }

  getPublicFeaturedProducts(): Observable<any> {
    return this.http.get<any>(this.baseUrl.concat(this.getPublicFeaturedProductsUrl));
  }

}
