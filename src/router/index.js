import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/views/Home'
import Activate from '@/components/views/Activate'
import ProgressBar from '@/components/ProgressBar';
import MyAccount from '@/components/views/MyAccount';
import NotFound from '@/components/views/NotFound'
import ForgotPassword from '@/components/views/ResetPassword'
import SSO from '@/components/SSO';

const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount();
document.body.appendChild(bar.$el);


Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/activate',
      name: 'Activate',
      component: Activate,
    },
    {
      path: '/myaccount',
      name: 'myaccount',
      component: MyAccount
    },
    {
      path: '/sso',
      component: SSO
    },
    {
      path: '/404',
      component: NotFound
    },
    {
      path: '/reset-password',
      component: ForgotPassword
    },
    {
      path: '*',
      redirect: Home
    }
  ]
});

router.onReady(() => {
 
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);
    let diffed = false;
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = prevMatched[i] !== c);
    })
    bar.start();
    return Promise.all(activated)
      .then(() => {
        bar.finish();
        next();
      })
      .catch(next);
  })

});



export default router;