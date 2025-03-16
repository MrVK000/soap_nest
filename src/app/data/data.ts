import { Benefit, FeaturedProduct, NavLink, Product, ResponsiveOption, Review } from "../interfaces/interfaces";


export const NAV_LINKS: NavLink[] = [
    { path: '/', label: 'Home', icon: 'fa-solid fa-house', },
    { path: '/products', label: 'Products', icon: 'fa-solid fa-bag-shopping', },
    { path: '/about', label: 'About Us', icon: 'fa-solid fa-leaf', },
    { path: '/contact', label: 'Contact', icon: 'fa-solid fa-message', },
    // { path: '/cart', label: 'Cart', icon: 'fa-solid fa-cart-shopping',},
    { path: '/login', label: 'Login', icon: 'fa-solid fa-circle-user', }
];

export const FEATURED_PRODUCTS: FeaturedProduct[] = [
    { id: 1, name: 'Neam Soap', price: 249, image: 'assets/content_images/neam-soap-1.webp' },
    { id: 2, name: 'Aloe Vera Shampoo', price: 449, image: 'assets/content_images/aloe-vera-shampoo-1.jpg' },
    { id: 3, name: 'Coconut Soap', price: 349, image: 'assets/content_images/coconut-soap-1.webp' }
];

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

export const REVIEWS: Review[] = [
    { name: 'Alice', text: 'The best handmade soaps I have ever used! So fresh and natural.' },
    { name: 'John', text: 'Absolutely love the aloe vera shampoo. My hair feels amazing!' },
    { name: 'Sam', text: 'Such an incredeble product. It fixed my hair. I really loved it.' },
    { name: 'Richie', text: 'Must try the coconut soap. Now a days my skin blows much better' },
    // { name: 'John', text: 'Absolutely love the aloe vera shampoo. My hair feels amazing!' },
    // { name: 'Alice', text: 'The best handmade soaps I have ever used! So fresh and natural.' },
    // { name: 'John', text: 'Absolutely love the aloe vera shampoo. My hair feels amazing!' },
    // { name: 'Alice', text: 'The best handmade soaps I have ever used! So fresh and natural.' },
    // { name: 'John', text: 'Absolutely love the aloe vera shampoo. My hair feels amazing!' },
];

export const PRODUCTS: Product[] = [
    { id: 1, name: 'Neam Soap', category: 'soap', price: 329, offer: 10, image: 'assets/content_images/neam-soap-1.webp' },
    { id: 2, name: 'Aloe Vera Shampoo', category: 'shampoo', price: 929, image: 'assets/content_images/aloe-vera-shampoo-1.jpg' },
    { id: 3, name: 'Coconut Soap', category: 'soap', price: 229, offer: 15, image: 'assets/content_images/coconut-soap-1.webp' },
    { id: 4, name: 'Papaya Soap', category: 'soap', price: 399, offer: 10, image: 'assets/content_images/papaya-soap-1.webp' },
    { id: 5, name: 'Lemon Shampoo', category: 'shampoo', price: 339, image: 'assets/content_images/aloe-vera-shampoo-1.jpg' },
    { id: 6, name: 'Eucalyptus Soap', category: 'soap', price: 689, offer: 15, image: 'assets/content_images/eucalyptus-soap-1.webp' },
    { id: 7, name: 'Mango Soap', category: 'soap', price: 449, offer: 10, image: 'assets/content_images/mango-soap-1.webp' },
    { id: 8, name: 'Hibuscus Shampoo', category: 'shampoo', price: 869, image: 'assets/content_images/aloe-vera-shampoo-1.jpg' },
    { id: 9, name: 'Sandalwood Soap', category: 'soap', price: 1099, image: 'assets/content_images/sandalwood-soap-1.webp' },
    { id: 10, name: 'Turmeric Soap', category: 'soap', price: 499, offer: 10, image: 'assets/content_images/turmeric-soap-1.webp' },
    { id: 11, name: 'Ginger Shampoo', category: 'shampoo', price: 649, image: 'assets/content_images/aloe-vera-shampoo-1.jpg' },
    { id: 12, name: 'Rosewood Soap', category: 'soap', price: 959, offer: 15, image: 'assets/content_images/sandalwood-soap-1.webp' },
    { id: 13, name: 'Goat Milk Soap', category: 'soap', price: 1299, offer: 10, image: 'assets/content_images/coconut-soap-1.webp' },
    { id: 14, name: 'Neam Shampoo', category: 'shampoo', price: 749, image: 'assets/content_images/aloe-vera-shampoo-1.jpg' },
    { id: 15, name: 'Neroli Soap', category: 'soap', price: 699, offer: 10, image: 'assets/content_images/mango-soap-1.webp' },
];

export const CART_ITEMS: Product[] = [
    { id: 1, name: 'Neam Soap', category: 'soap', price: 329, offer: 10, image: 'assets/content_images/neam-soap-1.webp' },
    { id: 2, name: 'Aloe Vera Shampoo', category: 'shampoo', price: 929, image: 'assets/content_images/aloe-vera-shampoo-1.jpg' },
    { id: 3, name: 'Coconut Soap', category: 'soap', price: 229, offer: 15, image: 'assets/content_images/coconut-soap-1.webp' },
    { id: 4, name: 'Papaya Soap', category: 'soap', price: 399, offer: 10, image: 'assets/content_images/papaya-soap-1.webp' },
    { id: 5, name: 'Sandalwood Soap', category: 'soap', price: 1099, image: 'assets/content_images/sandalwood-soap-1.webp' },
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