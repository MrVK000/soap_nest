import { Benefit, FeaturedProduct, NavLink, Product, ResponsiveOption, Review } from "../interfaces/interfaces";


export const NAV_LINKS: NavLink[] = [
    { path: '/home', label: 'Home', icon: 'fa-solid fa-house', },
    { path: '/products', label: 'Products', icon: 'fa-solid fa-bag-shopping', },
    { path: '/my-orders', label: 'My Orders', icon: 'fa-solid fa-clipboard-list', },
    // { path: '/contact', label: 'Contact', icon: 'fa-solid fa-message', },
    // { path: '/cart', label: 'Cart', icon: 'fa-solid fa-cart-shopping',},
    { path: '/my-account', label: 'My Profile', icon: 'fa-solid fa-user', },
    { path: '/about', label: 'About Us', icon: 'fa-solid fa-leaf', },
    // { path: '/login', label: 'Login', icon: 'fa-solid fa-circle-user', }
];

// export const FEATURED_PRODUCTS: FeaturedProduct[] = [
//     { id: 1, name: 'Neem Soap', price: 249, image: 'assets/content_images/neem-soap-1.webp' },
//     { id: 2, name: 'Aloe Vera Shampoo', price: 449, image: 'assets/content_images/aloe-vera-shampoo-1.jpg' },
//     { id: 3, name: 'Coconut Soap', price: 349, image: 'assets/content_images/coconut-soap-1.webp' }
// ];

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
    { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
    { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
    { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
    { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
    { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
    { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
    { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
    { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
    { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
    { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
    { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
    { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
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

export const PRODUCTS: Product[] = [
    {
        productId: "JDG34K",
        category: "soap",
        id: 1,
        name: 'Neem Soap',
        image: 'assets/content_images/neem-soap-1.webp',
        description: 'Handmade organic soap with natural aloe vera extracts. Perfect for all skin types.',
        price: 329,
        offer: 5,
        discountPrice: 312.55,
        stock: 28,
        reviews: [
            { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
            { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
            { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
        ]
    },
    {
        productId: "HS7183",
        category: "shampoo",
        id: 2,
        name: 'Aloe Vera Shampoo',
        image: 'assets/content_images/aloe-vera-shampoo-1.jpg',
        description: 'Handmade organic soap with natural aloe vera extracts. Perfect for all skin types.',
        price: 929,
        offer: 10,
        discountPrice: 836.1,
        stock: 47,
        reviews: [
            { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
            { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
        ]
    },
    {
        productId: "HS7283",
        category: "soap",
        id: 3,
        name: 'Hibuscus Soap',
        image: 'assets/content_images/papaya-soap-1.webp',
        description: 'Handmade organic soap with natural aloe vera extracts. Perfect for all skin types.',
        price: 229,
        offer: 0,
        discountPrice: 7.99,
        stock: 1,
        reviews: [
            { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
            { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
            { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
            { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
            { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
            { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
            { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
            { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
            { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
            { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
            { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
            { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
        ]
    },
    {
        productId: "HS7383",
        category: "soap",
        id: 4,
        name: 'Goat Milk Soap',
        image: 'assets/content_images/coconut-soap-1.webp',
        description: 'Handmade organic soap with natural aloe vera extracts. Perfect for all skin types.',
        price: 599,
        offer: 2,
        discountPrice: 587.02,
        stock: 6,
        reviews: [
            { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
            { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
            { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
            { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
            { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
        ]
    },
    {
        productId: "HS7483",
        category: "soap",
        id: 5,
        name: 'Neroli Soap',
        image: 'assets/content_images/aloe-vera-soap-1.webp',
        description: 'Handmade organic soap with natural aloe vera extracts. Perfect for all skin types.',
        price: 429,
        offer: 6,
        discountPrice: 403.26,
        stock: 18,
        reviews: [
            { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
        ]
    },
    {
        productId: "HS7583",
        category: "shampoo",
        id: 6,
        name: 'Lemon Shampoo',
        image: 'assets/content_images/aloe-vera-shampoo-1.jpg',
        description: 'Handmade organic soap with natural aloe vera extracts. Perfect for all skin types.',
        price: 479,
        offer: 14,
        discountPrice: 411.94,
        stock: 22,
        reviews: [
        ]
    },
    {
        productId: "HS7683",
        category: "soap",
        id: 7,
        name: 'Coconut Soap',
        image: 'assets/content_images/coconut-soap-1.webp',
        description: 'Handmade organic soap with natural aloe vera extracts. Perfect for all skin types.',
        price: 389,
        offer: 4,
        discountPrice: 373.44,
        stock: 72,
        reviews: [
            { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
            { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
            { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
            { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
            { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
            { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
            { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
            { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
        ]
    },
    {
        productId: "HS7783",
        category: "soap",
        id: 8,
        name: 'Papaya Soap',
        image: 'assets/content_images/papaya-soap-1.webp',
        description: 'Handmade organic soap with natural aloe vera extracts. Perfect for all skin types.',
        price: 559,
        offer: 2,
        discountPrice: 547.82,
        stock: 8,
        reviews: [
            { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
            { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
            { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
        ]
    },
    {
        productId: "HS7883",
        category: "soap",
        id: 9,
        name: 'Eucalyptus Soap',
        image: 'assets/content_images/eucalyptus-soap-1.webp',
        description: 'Handmade organic soap with natural aloe vera extracts. Perfect for all skin types.',
        price: 749,
        offer: 0,
        discountPrice: 0,
        stock: 2,
        reviews: [
            { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
        ]
    },
    {
        productId: "HS7983",
        category: "soap",
        id: 10,
        name: 'Mango Soap',
        image: 'assets/content_images/mango-soap-1.webp',
        description: 'Handmade organic soap with natural aloe vera extracts. Perfect for all skin types.',
        price: 399,
        offer: 6,
        discountPrice: 375.06,
        stock: 10,
        reviews: [
            { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
            { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
            { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
            { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
        ]
    },
    {
        productId: "HS2583",
        category: "shampoo",
        id: 11,
        name: 'Hibuscus Shampoo',
        image: 'assets/content_images/aloe-vera-shampoo-1.jpg',
        description: 'Handmade organic soap with natural aloe vera extracts. Perfect for all skin types.',
        price: 829,
        offer: 0,
        discountPrice: 0,
        stock: 10,
        reviews: [
            { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
            { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
        ]
    },
    {
        productId: "HS3583",
        category: "soap",
        id: 12,
        name: 'Sandalwood Soap',
        image: 'assets/content_images/sandalwood-soap-1.webp',
        description: 'Handmade organic soap with natural aloe vera extracts. Perfect for all skin types.',
        price: 879,
        offer: 0,
        discountPrice: 0,
        stock: 10,
        reviews: [
            { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
            { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
            { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
            { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
            { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
            { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
        ]
    },
    {
        productId: "HS4583",
        category: "soap",
        id: 13,
        name: 'Turmeric Soap',
        image: 'assets/content_images/turmeric-soap-1.webp',
        description: 'Handmade organic soap with natural aloe vera extracts. Perfect for all skin types.',
        price: 634,
        offer: 0,
        discountPrice: 0,
        stock: 4,
        reviews: [
            { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
            { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
            { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
        ]
    },
    {
        productId: "HS5583",
        category: "soap",
        id: 14,
        name: 'Rosewood Soap',
        image: 'assets/content_images/sandalwood-soap-1.webp',
        description: 'Handmade organic soap with natural aloe vera extracts. Perfect for all skin types.',
        price: 989,
        offer: 8,
        discountPrice: 909.88,
        stock: 10,
        reviews: [
            { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
            { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
            { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
            { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
            { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
            { user: 'Alice', rating: 5, comment: 'Amazing quality! My skin feels so fresh.' },
            { user: 'John', rating: 4, comment: 'Good product, but wish it was a bit bigger.' },
        ]
    },
];

// export const CART_ITEMS = [
//     {
//         productId: "HS7K83",
//         name: "Neem Soap",
//         category: "soap",
//         price: 329,
//         offer: 10, // 10% off
//         quantity: 2,
//         image: "assets/content_images/neem-soap-1.webp"
//     },
//     {
//         productId: "TX2B19",
//         name: "Lemon Soap",
//         category: "soap",
//         price: 549,
//         offer: 14, // 14% off
//         quantity: 1,
//         image: "assets/content_images/turmeric-soap-1.webp"
//     },
//     {
//         productId: "HS7K83",
//         name: "Neem Soap",
//         category: "soap",
//         price: 329,
//         offer: 10, // 10% off
//         quantity: 2,
//         image: "assets/content_images/neem-soap-1.webp"
//     },
//     {
//         productId: "TX2B19",
//         name: "Lemon Soap",
//         category: "soap",
//         price: 549,
//         offer: 14, // 14% off
//         quantity: 1,
//         image: "assets/content_images/turmeric-soap-1.webp"
//     },
//     {
//         productId: "HS7K83",
//         name: "Neem Soap",
//         category: "soap",
//         price: 329,
//         offer: 10, // 10% off
//         quantity: 2,
//         image: "assets/content_images/neem-soap-1.webp"
//     },
//     {
//         productId: "TX2B19",
//         name: "Lemon Soap",
//         category: "soap",
//         price: 549,
//         offer: 14, // 14% off
//         quantity: 1,
//         image: "assets/content_images/turmeric-soap-1.webp"
//     },
// ];

// export const CART_ITEMS: Product[] = [
//     { id: 1, name: 'Neem Soap', category: 'soap', price: 329, offer: 10, image: 'assets/content_images/neem-soap-1.webp' },
//     { id: 2, name: 'Aloe Vera Shampoo', category: 'shampoo', price: 929, image: 'assets/content_images/aloe-vera-shampoo-1.jpg' },
//     { id: 3, name: 'Coconut Soap', category: 'soap', price: 229, offer: 15, image: 'assets/content_images/coconut-soap-1.webp' },
//     { id: 4, name: 'Papaya Soap', category: 'soap', price: 399, offer: 10, image: 'assets/content_images/papaya-soap-1.webp' },
//     { id: 5, name: 'Sandalwood Soap', category: 'soap', price: 1099, image: 'assets/content_images/sandalwood-soap-1.webp' },
// ];



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