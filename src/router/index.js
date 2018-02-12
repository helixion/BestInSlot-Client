import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Activate from '@/components/Activate'
import ProgressBar from '@/components/ProgressBar';
import MyAccount from '@/components/MyAccount';
import NotFound from '@/components/NotFound'
import SSO from '@/components/SSO';

const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount();
document.body.appendChild(bar.$el);


Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/auth',
      name: 'Login',
      component: Login
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
      path: '*',
      redirect: HelloWorld
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