import type { SitemapUrlInput } from "@nuxtjs/sitemap";

export default defineSitemapEventHandler(async () => {
  const products = await $fetch('/api/products', {
    query: {
      limit: 1000
    },
  });

  return products.data.map(product => ({
    loc: `/catalog/${product.id}`,
    changefreq: 'daily',
    priority: 0.7
  })) satisfies SitemapUrlInput[];
})