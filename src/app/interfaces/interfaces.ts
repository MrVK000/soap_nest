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
    reviews: Review[]
}
export interface Cart {
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
    reviews: Review[],
    quantity: number
}
export interface Review {
    user: string;
    comment: string;
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
export interface Order {
    orderId: string;
    date: string;
    totalAmount: number;
    paymentMethod: string;
    status: string;
}
export interface OrderDetails {
    orderId: string;
    date: string;
    totalAmount: number;
    paymentMethod: string;
    status: string;
    deliveryAddress: string;
    items: { name: string; quantity: number; price: number }[];
}