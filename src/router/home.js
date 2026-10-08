const home = {
  path: '/',
  children: [
    {
      path: '',
      name: 'home',
      component: () => import('@/pages/home/HomePage.vue'),
      meta: { navBarOrder: 1, title: 'Home', icon: 'house' },
    },
  ],
}

export default home
