const routes = {
    account: {
        profile: '/account?profile',
        orderHistory: '/account?order-history',
        shippingBilling: '/account?shipping-billing',
        productReviews: '/account?product-reviews'
    },
    about: '/about',
    checkout: '/checkout',
    products: {
        all: '/products',
        popular: '/products/popular',
        hats: '/products/hats',
        hatsView: (slug: string) => `/products/hats/${slug}`, 
        scarves: '/products/scarves',
        scarvesView: (slug: string) => `/products/scarves/${slug}`,
        headBands: '/products/head-bands',
        headBandsView: (slug: string) => `/products/head-bands/${slug}`,
    },
    admin: {
        base: '/admin',
        orders: {
            all: '/admin/orders',
            view: (slug: string) => `/admin/orders/${slug}`,
            edit: (slug: string) => `/admin/orders/${slug}/edit`,
        },
        customers: {
            all: '/admin/customers',
            create: '/admin/customers/create',
            view: (slug: string) => `/admin/customers/${slug}`,
            edit: (slug: string) => `/admin/customers/${slug}/edit`,
        },
        products: {
            all: '/admin/products',
            create: '/admin/products/create',
            view: (slug: string) => `/admin/products/${slug}`,
            edit: (slug: string) => `/admin/products/${slug}/edit`,
        },
        promos: {
            all: '/admin/promos',
            create: '/admin/promos/create',
            view: (slug: string) => `/admin/promos/${slug}`,
            edit: (slug: string) => `/admin/promos/${slug}/edit`,
        },
        testimonials: {
            all: '/admin/testimonials',
            create: '/admin/testimonials/create',
            view: (slug: string) => `/admin/testimonials/${slug}`,
            edit: (slug: string) => `/admin/testimonials/${slug}/edit`,
        },
    }
};

export default routes;