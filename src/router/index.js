import { createRouter, createWebHistory } from 'vue-router';
import localforage from 'localforage';
import Reqs from '../requisitions/loggedUser/';

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
        {
          path: 'recovery/:id',
          name: 'Recovery',
          component: () =>
            import('../components/View_Home/RecoverPassword.vue'),
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
          beforeEnter: (to, from) => {
            if (from.name === 'Login') {
              window.document.body.classList.add('__addBackground');
              setTimeout(() => {
                window.document.body.classList.remove('__addBackground');
              }, 260);
            }
          },
        },
      ],
      redirect: { name: 'Contacts' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'PageNotFound',
      component: () => import('../views/PageNotFound/PageNotFound.vue'),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  let user = await localforage.getItem('user');

  if (user) {
    try {
      const req = await Reqs.verifyAuthToken();
      req.success ? (user.authConfirm = true) : (user.authConfirm = false);
    } catch (e) {
      console.log(e);
    }
  }

  if (user?.authConfirm && to.matched[0].path === '/') {
    /*Se tiver token de autenticação válido e estiver indo
    para uma rota que não precisa de login, será jogado pa-
    ra a tela principal da conta. Ou seja, não permite fa-
    zer login, registrar, esquecer a senha caso tenha auth
    Token válido no localforage. Necessita fazer logout.*/

    next({ name: 'User' });
  } else if (!user?.authConfirm && to.matched[0].path !== '/') {
    /*Caso não tenha token de autenticação valido e tentar ir para
    uma rota que necessita de autenticação, será redirecionado pa-
    ra a tela de login.*/
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
