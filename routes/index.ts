const routes = {
    account: {
        base: '/account',
        orderHistory: '/account/order-history',
        settings: '/account/settings'
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
    }
};

export default routes;