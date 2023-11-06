import { setupLayouts } from 'virtual:generated-layouts';
import { createRouter, createWebHistory } from 'vue-router';
import routes from '~pages';
import { isUserLoggedIn } from './utils';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...setupLayouts(routes),
  ],
})


//check user login or not 
router.beforeEach((to,from,next) => {
  const isLoggedIn = isUserLoggedIn();
  //let userinfo = getUserInfo().userinfo;
  if(to.name != 'login') {
    // console.log("meta::",to.meta);
      if(isLoggedIn) {
        // console.log("to.meta.length",to.meta.length);
          if(to.meta  && to.meta.requiredRole && 
            !to.meta.requiredRole.includes(userinfo.role)) {
            // console.log("to.meta.requiredRole.length",to.meta.requiredRole.length);
            return next('/my-page1/id:11')
          }
          else {
            // console.log("meta::",to)
            next();
           
          }
      } else {
        return next('/login');
      }
  } else {
    next();
  }
});



// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
export default router
