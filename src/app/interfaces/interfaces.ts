export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    offer: number;
    image: string;
    productId: string,
    description: string,
    discountPrice: number,
    stock: number,
    rating: number,
    isFavoriteItem: boolean,
    isWishlistItem: boolean,
    wishlistItemId: number,
    favoriteItemId: number,
    reviews: Review[]
}
export interface CartItem {
    cartItemId: number;
    productId: string,
    category: string;
    name: string;
    image: string;
    description: string,
    price: number;
    offer: number;
    discountPrice: number,
    stock: number,
    reviews: Review[],
    quantity: number
}
export interface Review {
    id?: number;
    comment: string;
    userName: string;
    rating: number;
    productId: string;
    customerId: string | null;
    createdAt?: string;
}
export interface ReviewShort {
    comment: string;
    userName: string;
    rating: number;
}
export interface ResponsiveOption {
    breakpoint: string;
    numVisible: number;
    numScroll: number;
}
export interface Benefit {
    label: string;
    description: string;
    image: string;
}
export interface FeaturedProduct {
    id: number;
    name: string;
    price: number;
    image: string;
}
export interface NavLink {
    path: string;
    label: string;
    icon: string;
}
// export interface Order {
//     orderId: string;
//     date: string;
//     totalAmount: number;
//     paymentMethod: string;
//     status: string;
// }
// export interface OrderDetails {
//     orderId: string;
//     date: string;
//     totalAmount: number;
//     paymentMethod: string;
//     status: string;
//     deliveryAddress: string;
//     items: { name: string; quantity: number; price: number }[];
// }

export interface RegisterUserForm {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: number;
    address: string;
    district: string;
    state: string;
    pincode: number;
    terms: boolean;
}

export interface LoginUserForm {
    email: string;
    password: string;
}

export interface CartItemPayload {
    cartItemId?: number,
    customerId?: string,
    productId?: string,
    quantity: number
}

export interface WishlistItemPayload {
    customerId?: string,
    productId?: string
}

export interface FavoriteItemPayload {
    customerId?: string,
    productId?: string
}

export interface WishlistItem {
    id?: number,
    customerId?: string,
    productId?: string,
    name: string,
    description: string,
    price: number,
    image: string
}

export interface Message {
    name: string;
    email: string;
    phoneNumber: string;
    message: string;
}

export interface User {
    name: string,
    customerId: string,
    email: string,
    phone: string,
    address: string,
    district: string | null,
    state: string | null,
    pincode: string | null,
    createdAt: string,
    updatedAt: string
}

export interface Order {
    id: number;
    orderNumber: string;
    totalAmount: number;
    status: string;
    paymentMode: string;
    paymentStatus: string;
    shippingAddress: string;
    district: string;
    state: string;
    pincode: number;
    customerId: string;
    createdAt: string;
    updatedAt: string;
    customer: CustomerShort;
    items?: OrderItem[];
}

export interface CustomerShort {
    name: string;
    email: string;
}

export interface OrderItem {
    id: number;
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
    orderId: number;
    product: OrderItemProduct;
}

export interface OrderItemProduct {
    name: string;
    price: string;
}

export interface Coupon {
    code: string;
    isVerified: boolean;
}

export interface Suggestion {
    name: string;
    productId: string;
}