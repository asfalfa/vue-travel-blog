import { createRouter, createWebHistory } from 'vue-router'
import { getUserLoginStatus } from '../services/users';
import VueCookies from 'vue-cookies'
import HomeView from '../views/HomeView.vue'
import PostView from '../views/PostView.vue'
import AdminView from '../views/admin/AdminView.vue'
import PostsView from '../views/admin/PostsView.vue'
import AddPostView from '../views/admin/posts/AddPostView.vue'
import EditPostView from '../views/admin/posts/EditPostView.vue'
import EditPostSingleView from '../views/admin/posts/EditPostSingleView.vue'
import UsersView from '../views/admin/UsersView.vue'
import LoginView from '../views/admin/users/LoginView.vue'
import RegisterView from '../views/admin/users/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/posts/:id',
      name: 'SinglePost',
      component: PostView
    },
    {
      path: '/admin/',
      name: 'Admin',
      component: AdminView,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'users',
          name: 'Users',
          component: UsersView,
        },
        {
          path: 'posts',
          name: 'Posts',
          component: PostsView,
          children: [
            {
              path: 'add',
              component: AddPostView,
            },
            {
              path: 'edit',
              component: EditPostView,
            },
            {
              path: 'edit/:id',
              component: EditPostSingleView,
            },
          ]
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
    },
  ],
})

async function canUserAccess(url){
  if(!url.meta.requiresAuth){
    return true
  } else{
    const id = VueCookies.get('tl-u');
    const token = VueCookies.get('tl-uref');
    if(id !== null && token !== null){
        let status = getUserLoginStatus(id, token).then(res => {
            if(res.data.valid == true){
              return true;
            } else{
              return false;
            }
        })
        return status
    } else{
      return false
    }
  }
}

router.beforeEach(async (to, from) => {
  // canUserAccess() returns `true` or `false`
  const canAccess = await canUserAccess(to)
  if (!canAccess) return '/login'
})

export default router
