import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)




// 路由独享守卫
function checkedEnter(path,next) {
  let menuS_url = store.state.userInfo.menus_url;
  if (menuS_url.includes(path)) {
    next();
  } else {
    next('/');
  }
}
export let routerChildren = [{
    path: "banner",
    component: () => import('../pages/banner/banner.vue'),
    name: '轮播图管理',
    beforeEnter(to, from, next) {
      checkedEnter("/banner",next);
    }
  },
  {
    path: "cate",
    component: () => import('../pages/cate/cate.vue'),
    name: '商品分类',
    beforeEnter(to, from, next) {
      checkedEnter("/cate",next);
    }
  },
  {
    path: "goods",
    component: () => import('../pages/goods/goods.vue'),
    name: '商品管理',
    beforeEnter(to, from, next) {
      checkedEnter("/goods",next);
    }
  },

  {
    path: "manage",
    component: () => import('../pages/manage/manage.vue'),
    name: '管理员管理',
    beforeEnter(to, from, next) {
      checkedEnter("/manage",next);
    }
  },
  {
    path: "menber",
    component: () => import('../pages/menber/menber.vue'),
    name: '会员管理',
    beforeEnter(to, from, next) {
      checkedEnter("/menber",next);
    }
  },
  {
    path: "role",
    component: () => import('../pages/role/role.vue'),
    name: '角色管理',
    beforeEnter(to, from, next) {
      checkedEnter("/role",next);
    }
  },
  {
    path: "seckill",
    component: () => import('../pages/seckill/seckill.vue'),
    name: '秒杀活动',
    beforeEnter(to, from, next) {
      checkedEnter("/seckill",next);
    }
  },
  {
    path: "specs",
    component: () => import('../pages/specs/specs.vue'),
    name: '商品规格',
    beforeEnter(to, from, next) {
      checkedEnter("/specs",next);
    }
  },
  {
    path: "menu",
    component: () => import('../pages/menu/menu.vue'),
    name: '菜单管理',
    beforeEnter(to, from, next) {
      checkedEnter("/menu",next);
    }
  },
]
let router = new Router({
  routes: [{
      path: '/',
      component: () => import('../pages/index/index.vue'),
      children: [{
          path: '',
          component: () => import('../pages/home/home.vue')
        },

        ...routerChildren
      ]
    }, {
      path: "/login",
      component: () => import('../pages/login/login.vue')
    }

  ]
})
router.beforeEach((to, from, next) => {
  //  如果前往登录 next
  if (to.path == "/login") {
    next();
    return
  }

  if (store.state.userInfo.token) {
    next();
    return
  }
  // console.log(store);
  next("/login");
})
export default router
