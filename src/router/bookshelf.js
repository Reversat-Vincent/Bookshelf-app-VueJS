const bookshelf = {
  path: '/bookshelf',
  children: [
    {
      path: '',
      name: 'bookshelf',
      component: () => import('@/pages/bookshelf/BookshelfPage.vue'),
      meta: { navBarOrder: 2, title: 'Bookshelf', icon: 'book', loading: true },
    },
    {
      path: 'add',
      name: 'book-add',
      component: () => import('@/pages/bookshelf/BookPage.vue'),
      meta: { title: 'Book add' },
    },
    {
      path: ':id(\\d+)',
      name: 'book',
      component: () => import('@/pages/bookshelf/BookPage.vue'),
      meta: { title: 'Book', loading: true },
    },
  ],
}

export default bookshelf
