import { Benefit, NavLink, ResponsiveOption, ReviewShort } from "../interfaces/interfaces";


export const NAV_LINKS: NavLink[] = [
    { path: '/home', label: 'Home', icon: 'pi pi-home' },
    { path: '/products', label: 'Products', icon: 'pi pi-shopping-bag' },
    // { path: '/my-orders', label: 'My Orders', icon: 'pi pi-list' },
    // { path: '/contact', label: 'Contact', icon: 'pi pi-comment' },
    // { path: '/cart', label: 'Cart', icon: 'pi pi-shopping-cart' },
    // { path: '/my-account', label: 'My Profile', icon: 'pi pi-user' },
    // { path: '/about', label: 'About Us', icon: 'pi pi-info-circle' },
    // { path: '/login', label: 'Login', icon: 'pi pi-sign-in' }
];

// export const FEATURED_PRODUCTS: FeaturedProduct[] = [
//     { id: 1, name: 'Neem Soap', price: 249, image: 'assets/content_images/neem-soap-1.webp' },
//     { id: 2, name: 'Aloe Vera Shampoo', price: 449, image: 'assets/content_images/aloe-vera-shampoo-1.jpg' },
//     { id: 3, name: 'Coconut Soap', price: 349, image: 'assets/content_images/coconut-soap-1.webp' }
// ];
// <img  src="../../../../public/assets/content_images/11.webp" alt="{{ product.name }}">
export const BENEFITS: Benefit[] = [
    {
        label: '100% Natural',
        description: 'No chemicals, no artificial fragrances.',
        image: 'assets/content_images/natural-soap-1.webp',
    },
    {
        label: 'Eco-Friendly',
        description: 'Biodegradable & sustainable packaging.',
        image: 'assets/content_images/eco-package-1.jpeg',
    },
    {
        label: 'Handmade with Love',
        description: 'Crafted in small batches for quality.',
        image: 'assets/content_images/handmade-soap-3.jpg',
    },
];

export const REVIEWS: ReviewShort[] = [
    { userName: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
    { userName: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
    { userName: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
    { userName: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
    { userName: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
    { userName: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
    { userName: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
    { userName: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
    { userName: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
    { userName: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
    { userName: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
    { userName: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
    // { name: 'Alice', text: 'The best handmade soaps I have ever used! So fresh and natural.' },
    // { name: 'John', text: 'Absolutely love the aloe vera shampoo. My hair feels amazing!' },
    // { name: 'Sam', text: 'Such an incredeble product. It fixed my hair. I really loved it.' },
    // { name: 'Richie', text: 'Must try the coconut soap. Now a days my skin blows much better' },
    // { name: 'John', text: 'Absolutely love the aloe vera shampoo. My hair feels amazing!' },
    // { name: 'Alice', text: 'The best handmade soaps I have ever used! So fresh and natural.' },
    // { name: 'John', text: 'Absolutely love the aloe vera shampoo. My hair feels amazing!' },
    // { name: 'Alice', text: 'The best handmade soaps I have ever used! So fresh and natural.' },
    // { name: 'John', text: 'Absolutely love the aloe vera shampoo. My hair feels amazing!' },
];



export const RESPONSIVE_OPTIONS: ResponsiveOption[] = [
    {
        breakpoint: '6400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '5200px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '5200px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '4600px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '3200px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '2500px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1900px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
]