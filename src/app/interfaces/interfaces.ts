export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    offer?: number;
    image: string;
}
export interface Review  {
    name: string;
    text: string;
}
export interface ResponsiveOption  {
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
export interface NavLink  {
    path: string;
    label: string;
    icon: string;
}
