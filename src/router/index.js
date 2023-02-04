import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home/Home.vue'),
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('../components/View_Home/Login.vue'),
        },
        {
          path: 'register',
          name: 'Register',
          component: () => import('../components/View_Home/Register.vue'),
        },
        {
          path: 'forgotPassword',
          name: 'Forgot Password',
          component: () => import('../components/View_Home/ForgotPassword.vue'),
        },
      ],
      redirect: { name: 'Login' },
    },
    {
      path: '/user',
      name: 'User',
      children: [
        {
          path: 'contacts',
          name: 'Contacts',
          component: () => import('../views/Contacts/Contacts.vue'),
        },
      ],
      redirect: { name: 'Contacts' },
    },
  ],
});

export default router;
