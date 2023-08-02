import { createRouter, createWebHistory } from 'vue-router'
import VueCookies from 'vue-cookies'
import HomeView from '../views/HomeView.vue'
import PostView from '../views/PostView.vue'
import AdminView from '../views/admin/AdminView.vue'
import PostsView from '../views/admin/PostsView.vue'
import AddPostView from '../views/admin/posts/AddPostView.vue'
import EditPostView from '../views/admin/posts/EditPostView.vue'
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
    const token = VueCookies.get('tl-uref');
    // Here we have to check with the DB if the token exists, the token will be a hash linked to the db user, the db will have to de-hash it
    if(token){ // if token matches, return true
      return true
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
