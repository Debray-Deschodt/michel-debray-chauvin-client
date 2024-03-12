import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Paintings0124View from '../views/paintings/Paintings0124View.vue'
import Paintings0224View from '../views/paintings/Paintings0224View.vue'
import Paintings0324View from '../views/paintings/Paintings0324View.vue'
import ViewerView from '../views/ViewerView.vue'
import ExpositionsView from '../views/ExpositionsView.vue'
import ContactView from '../views/ContactView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/peintures0124',
    name: 'Paintings0124',
    component: Paintings0124View,
    children: [
      {
        path: ':id',
        name: 'Painting0124Viewer',
        component: ViewerView
      }
    ]
  },
  {
    path: '/peintures0224',
    name: 'Paintings0224',
    component: Paintings0224View,
    children: [
      {
        path: ':id',
        name: 'Painting0224Viewer',
        component: ViewerView
      }
    ]
  },
  {
    path: '/peintures0324',
    name: 'Paintings0324',
    component: Paintings0324View,
    children: [
      {
        path: ':id',
        name: 'Painting0324Viewer',
        component: ViewerView
      }
    ]
  },
  // {
  //   path: '/peintures0424',
  //   name: 'Peintings0424',
  //   component: () =>
  //     import(/* webpackChunkName: "Paintings0424" */ '@/views/paintings/Paintings0424View.vue'),
  //   children: [
  //     {
  //       path: ':id',
  //       name: 'Painting0424Viewer',
  //       component: () => import(/* webpackChunkName: "Viewer" */ '@/views/ViewerView.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/peintures0524',
  //   name: 'Paintings0524',
  //   component: () =>
  //     import(/* webpackChunkName: "Paintings0524" */ '@/views/paintings/Paintings0524View.vue'),
  //   children: [
  //     {
  //       path: ':id',
  //       name: 'Painting0524Viewer',
  //       component: () => import(/* webpackChunkName: "Viewer" */ '@/views/ViewerView.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/peintures0624',
  //   name: 'Paintings0624',
  //   component: () =>
  //     import(/* webpackChunkName: "Paintings06.24" */ '@/views/paintings/Paintings0624View.vue'),
  //   children: [
  //     {
  //       path: ':id',
  //       name: 'Painting0624Viewer',
  //       component: () => import(/* webpackChunkName: "Viewer" */ '@/views/ViewerView.vue')
  //     }
  //   ]
  // },
  {
    path: '/expositions',
    name: 'Expositions',
    component: ExpositionsView
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'router-active-link',
  linkExactActiveClass: 'router-exact-active-link',
  scrollBehavior(to, from, savedPosition) {
    return (
      savedPosition ||
      new Promise((resolve) => {
        setTimeout(() => resolve({ top: 0, behavior: 'instant' }), 100)
      })
    )
  }
})

export default router
